const fs = require('fs');

function getCountOfBitsInColumn(input, column) {
    const rowLength = input.length;
    let numZeros = 0, numOnes = 0;
    for (let i = 0; i < rowLength; i++) {
        let val = input[i][column];
        switch(val) {
            case '0':
                numZeros++;
                break;
            case '1':
                numOnes++;
                break;
        }
    }

    return {
        numZeros,
        numOnes
    }
}

function calculatePowerConsumption(binaryNumberList) {
    const rowLength = binaryNumberList.length;
    const colLength = binaryNumberList[0].length;
    let gammaRateBinary = '', epsilonRateBinary = '';
    for (let i = 0; i < colLength; i++) {
        let numZeros = 0, numOnes = 0;
        for (let j = 0; j < rowLength; j++) {
            let val = binaryNumberList[j][i];
            switch(val) {
                case '0':
                    numZeros++;
                    break;
                case '1':
                    numOnes++;
                    break;
            }
        }

        if (numZeros > numOnes) {
            gammaRateBinary += '0';
            epsilonRateBinary += '1';
        } else {
            gammaRateBinary += '1';
            epsilonRateBinary += '0';
        }
    }

    const gammaRate = parseInt(gammaRateBinary, 2);
    const epsilonRate = parseInt(epsilonRateBinary, 2);
    return gammaRate * epsilonRate;
}

function calculateOxygenGeneratorRating(input) {
    const colLength = input[0].length;
    for (let i = 0; i < colLength; i++) {
        input = input.filter(binaryNumber => {
            let counts = getCountOfBitsInColumn(input, i);
            if (counts.numZeros > counts.numOnes) {
                return binaryNumber[i] == 0;
            } else {
                return binaryNumber[i] == 1;
            }
        });
    }
    return parseInt(input[0], 2);
}

function calculateCo2ScrubberRating(input) {
    const colLength = input[0].length;
    for (let i = 0; i < colLength; i++) {
        if (input.length === 1) {
            break;
        }
        input = input.filter(binaryNumber => {
            let counts = getCountOfBitsInColumn(input, i);
            if (counts.numZeros > counts.numOnes) {
                return binaryNumber[i] == 1;
            } else {
                return binaryNumber[i] == 0;
            }
        });
    }
    return parseInt(input[0], 2);
}

function calculateLifeSupportRating(input) {
    const oxygenGeneratorRating = calculateOxygenGeneratorRating(input);
    const co2ScrubberRating = calculateCo2ScrubberRating(input);
    return oxygenGeneratorRating * co2ScrubberRating;
}

function getInput() {
    let input = fs.readFileSync('./day-3.txt').toString();
    input = input.split('\n').map(v => v.trim()).slice(0, -1);
    return input;
}

function main() {
    let input = getInput();
    // const movementProduct = calculatePowerConsumption(input);
    // console.log(movementProduct);
    const lifeSupportRating = calculateLifeSupportRating(input);
    console.log(lifeSupportRating);
}

main();
