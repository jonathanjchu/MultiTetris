const Tetromino = require("./tetromino");

class Tetris {
    constructor() {
        this.grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.currentTetromino = new Tetromino();
        this.isGameOver = false;
        this.linesRemoved = 0;
        this.score = 0;
    }

    getBoardState() {
        return this.grid;
    }

    getBoardAndTetromino() {
        let tempGrid = [];
        for (let i = 0; i < this.grid.length; i++) {
            tempGrid.push([...this.grid[i]]);
        }

        let y = this.currentTetromino.getY();
        let x = this.currentTetromino.getX();
        let shape = this.currentTetromino.getShape();

        for (let i = y, i2 = 0; i < y + shape.length && i < this.grid.length; i++ , i2++) {
            for (let j = x, j2 = 0; j < x + shape[i2].length; j++ , j2++) {
                if (i2 < shape.length && j2 < shape[i2].length) {
                    // console.log(`i: ${i}, j: ${j}`);
                    tempGrid[i][j] = (shape[i2][j2] || this.grid[i][j]);
                }
            }
        }

        return tempGrid;
    }

    // isGameOver() {
    //     return this.isGameOver;
    // }

    saveTetromino() {
        let temp = this.getBoardAndTetromino()
        this.grid = [...temp];
    }

    rotateTetromino() {
        this.currentTetromino.rotate();
    }

    dropTetromino() {
        while (!this.isTetrominoCollideWithBottom()) {
            this.currentTetromino.moveDown();
        }
        this.saveTetromino();
        this.currentTetromino = new Tetromino();
    }

    moveTetrominoDown() {
        if (!this.isTetrominoCollideWithBottom()) {
            this.currentTetromino.moveDown();
        }
    }

    moveTetrominoLeft() {
        if (!this.isTetrominoCollideWithLeft()) {
            this.currentTetromino.moveLeft();
        }
    }

    moveTetrominoRight() {
        if (!this.isTetrominoCollideWithRight()) {
            this.currentTetromino.moveRight();
        }
    }

    gameLoop() {
        this.gameLoopChecks();
        this.fall();
    }

    gameLoopChecks() {
        this.removeLines();
    }

    handleKeyPress(keyCode) {
        // console.log(keyCode);

        switch (keyCode) {
            case 38:    // UP
                this.rotateTetromino();
                break;

            case 40:    // DOWN
                this.moveTetrominoDown();
                break;

            case 39:    // RIGHT
                this.moveTetrominoRight();
                break;

            case 37:    // LEFT
                this.moveTetrominoLeft();
                break;

            case 32:    // SPACE
                this.dropTetromino();
                break;

            // case 17:    // LEFT CONTROL
            //     break;
        }

        this.keyPressChecks();
    }

    keyPressChecks() {
        this.removeLines();
    }

    fall() {
        if (!this.isTetrominoCollideWithBottom()) {
            this.currentTetromino.moveDown();
        }
        else if (this.currentTetromino.getY() === 0) {
            // game over
            console.log("GAME OVER");
            this.isGameOver = true;
        }
        else {
            // console.log(shapePosY);
            this.saveTetromino();
            this.currentTetromino = new Tetromino();

            // console.log(grid);
        }
    }

    isTetrominoCollideWithBottom() {
        let y = this.currentTetromino.getY();
        let x = this.currentTetromino.getX();
        let shape = this.currentTetromino.getShape();

        if (y + shape.length >= this.grid.length) {
            // reached bottom of grid
            return true;
        }
        else {
            for (let i = shape.length - 1; i >= 0; i--) {
                for (let j = 0; j < shape[i].length; j++) {
                    if (shape[i][j] !== 0 && this.grid[y + i + 1][x + j] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isTetrominoCollideWithRight() {
        let shape = this.currentTetromino.getShape();
        let y = this.currentTetromino.getY();
        let x = this.currentTetromino.getX();

        if (x + shape[0].length >= this.grid[0].length) {
            // colliding with right wall
            return true;
        }
        else {
            for (let i = 0; i < shape.length; i++) {
                let j = shape[i].length - 1;

                if (shape[i][j] !== 0 && this.grid[y + i][x + j + 1] !== 0) {
                    return true;
                }
            }
            return false;
        }
    }

    isTetrominoCollideWithLeft() {
        let shape = this.currentTetromino.getShape();
        let y = this.currentTetromino.getY();
        let x = this.currentTetromino.getX();

        if (x <= 0) {
            // colliding with left wall
            return true;
        }
        else {
            for (let i = 0; i < shape.length; i++) {

                if (shape[i][0] !== 0 && this.grid[y + i][x - 1] !== 0) {
                    return true;
                }
            }

            return false;
        }
    }

    removeLines() {
        let lineCount = 0;
        for (let i = this.grid.length - 1; i >= 0; i--) {
            let isLine = true;
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] === 0) {
                    isLine = false;
                    break;
                }
            }

            if (isLine) {
                lineCount++;
                this.shiftGridDown(i);
                // console.log(`Removing line ${i}`);
                i++;
                this.linesRemoved++;
            }
        }

        if (lineCount > 0) {
            console.log(`Removed ${lineCount} line(s)`);
        }
    }

    shiftGridDown(startRow) {
        for (let i = startRow; i > 0; i--) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = this.grid[i - 1][j];
            }
        }

        for (let k = 0; k < this.grid[0].length; k++) {
            this.grid[0][k] = 0;
        }
    }

    addGarbageLines(numLines) {
        this.shiftWholeGridUp(numLines);

        for (let i = this.grid.length - 1; i >= this.grid.length - numLines; i--) {
            
        }
    }

    shiftWholeGridUp(numRows) {
        for (let i = 0; i < this.grid.length - numRows; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = this.grid[i+numRows][j];
            }
        }
    }
}


module.exports = Tetris;