const fs = require('fs');

class Board {
    constructor() {
        this.rows = [];
        this._markedRows = [];
        this.lastNumberCalled= 0;
    }

    markValue(val) {
        this.lastNumberCalled = val;
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.rows[0].length; j++) {
                if (this.rows[i][j] === val) {
                    this._markedRows[i][j] = 'X';
                }
            }
        }
    }

    isFull() {
        return this.rows.length === 5 && this.rows[4].length === 5;
    }

    getWinningScore() {
        let unmarkedSum = 0;
        for (let i = 0; i < this._markedRows.length; i++) {
            for (let j = 0; j < this._markedRows[0].length; j++) {
                if (this._markedRows[i][j] !== 'X') {
                    unmarkedSum += this.rows[i][j];
                }
            }
        }

        return this.lastNumberCalled * unmarkedSum;
    }

    isWinner() {
        for (let i = 0; i < this._markedRows.length; i++) {
            let numMarkedVertical = 0;
            let numMarkedHorizontal = 0;
            for (let j = 0; j < this._markedRows[0].length; j++) {
                if (this._markedRows[i][j] === 'X') {
                    numMarkedVertical++;
                }

                if (this._markedRows[j][i] === 'X') {
                    numMarkedHorizontal++;
                }

                if (numMarkedVertical === 5 || numMarkedHorizontal === 5) {
                    return true;
                }
            }
        }

        return false;
    }

    getMarkedGameBoard() {
        return this._markedRows;
    }

    addRow(row) {
        this.rows.push(row);
        if (this.isFull()) {
            this._markedRows = this.rows.map(arr => {
                return arr.slice();
            });
        }
    }
}

function getInput() {
    /*
        parses input and returns object like:

        {
            order: 10, 1, 2, 4, 8
            boards: [
                Board { rows: [....] },
                Board { rows: [....] },
                ..
            ]
        }
     */
    let input = fs.readFileSync('./day-4.txt').toString();
    input = input.split('\n');
    const obj = {};
    obj.order = input[0].split(',').map(value => parseInt(value.trim()));
    obj.boards = [new Board()];

    let currentInputIndex = 1;
    let boardCount = 0;
    while (currentInputIndex < input.length) {
        if (input[currentInputIndex].length) {
            if (obj.boards[boardCount].isFull()) {
                boardCount++;
                obj.boards.push(new Board());
            }

            obj.boards[boardCount].addRow(
                input[currentInputIndex].split(/\s+/)
                        .filter(value => value.length > 0)
                        .map(value => parseInt(value.trim()))
            );
        }
        currentInputIndex++;
    }

    return obj;
}

function playGame(gameInput) {
    for (let number of gameInput.order) {
        console.log(`Calling number ${number}`);
        for (let board of gameInput.boards) {
            board.markValue(number);
            if (board.isWinner()) {
                console.log('And the winner is:');
                console.table(board.getMarkedGameBoard());
                return board.getWinningScore();
            }
        }
    }
}

function main() {
    const input = getInput();
    const score = playGame(input);
    console.log(score);
}

main();
