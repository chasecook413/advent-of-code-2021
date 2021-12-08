const fs = require('fs');

function calculatePositionAfterMovements(listOfMovements) {
    let horizontalPosition = 0, depth = 0, aim = 0;
    for (const movement of listOfMovements) {
        let [direction, units] = movement.split(' ').map(v => v.trim());
        units = parseInt(units);
        // console.log(`Horizontal pos: ${horizontalPosition}, Depth: ${depth}, Aim: ${aim},
        // Units ${units}, Direction: ${direction}`);
        switch (direction) {
            case 'forward':
                horizontalPosition += units;
                depth += aim * units;
                break;
            case 'down':
                aim += units;
                break;
            case 'up':
                aim -= units;
                break;
        }
    }

    return horizontalPosition * depth;
}

function getInput() {
    let input = fs.readFileSync('./day-2.txt').toString();
    input = input.split('\n').map(v => v.trim());
    return input;
}

function main() {
    let input = getInput();
    const movementProduct = calculatePositionAfterMovements(input);
    console.log(movementProduct);
}

main();
