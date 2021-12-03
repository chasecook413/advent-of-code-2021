const fs = require('fs');

function countNumIncreases(listOfNumbers) {
    let count = 0;
    for (let index = 1; index < listOfNumbers.length; index++) {
        if (listOfNumbers[index] > listOfNumbers[index-1]) {
            count++;
        }
    }
    return count;
}

function reduceListOfNumbersToSlidingWindowSums(listOfNumbers, windowLength) {
    const sums = [];
    for (let i = 0; i < listOfNumbers.length - (windowLength - 1); i++) {
        sums.push(listOfNumbers[i]);
        for (let j = 0; j < windowLength - 1; j++) {
            if (i + j + 1 < listOfNumbers.length) {
                sums[i] += listOfNumbers[i + j + 1];
            }
        }
    }
    return sums;
}

function getInput() {
    let input = fs.readFileSync('./day-1.txt').toString();
    input = input.split('\n').map(v => parseInt(v.trim()));
    return input;
}

function main() {
    let input = getInput();
    input = reduceListOfNumbersToSlidingWindowSums(input, 3);
    const count = countNumIncreases(input);
    console.log(count);
}

main();
