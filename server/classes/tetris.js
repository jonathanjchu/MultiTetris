const Tetromino = require("./tetromino");

class Tetris {
    constructor(id, username) {
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

        this.id = id;
        this.username = username;
        this.currentTetromino = new Tetromino();
        this.nextTetromino = new Tetromino();
        this.isGameOver = false;
        this.isWinner = false;
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

    getNextTetromino() {
        return this.nextTetromino.getShape();
    }

    // isGameOver() {
    //     return this.isGameOver;
    // }

    loadNextTetromino() {
        let temp = this.getBoardAndTetromino()
        this.grid = [...temp];

        this.currentTetromino = this.nextTetromino;
        this.nextTetromino = new Tetromino();
    }

    rotateTetromino() {

        this.currentTetromino.rotate();
        let shape = this.currentTetromino.getShape();
        let x = this.currentTetromino.getX();
        let y = this.currentTetromino.getY();
        let width = this.currentTetromino.getWidth();
        let height = this.currentTetromino.getHeight();

        let canRotate = true;
        for (let i = y; i < y + height; i++) {

            if (i > this.grid.length) {
                canRotate = false;
                break;
            }

            for (let j = x; j < x + width; j++) {
                if (j > this.grid[i].length ||
                    this.grid[i][j] !== 0) {
                    canRotate = false;
                    break;
                }
            }

            if (!canRotate) {
                break;
            }
        }

        if (!canRotate) {
            this.currentTetromino.unrotate();
        }

    }

    dropTetromino() {
        while (!this.isTetrominoCollideWithBottom()) {
            this.currentTetromino.moveDown();
        }

        if (this.currentTetromino.getY() === 0) {
            this.isGameOver = true;
        }
        else {
            this.loadNextTetromino();
        }
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
        let linesRemoved = this.gameLoopChecks();
        this.fall();

        return linesRemoved;
    }

    gameLoopChecks() {
        return this.removeLines();
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

        return this.keyPressChecks();
    }

    keyPressChecks() {
        return this.removeLines();
    }

    fall() {
        if (!this.isTetrominoCollideWithBottom()) {
            this.currentTetromino.moveDown();
        }
        else if (this.currentTetromino.getY() === 0) {
            // game over
            this.isGameOver = true;
        }
        else {
            // console.log(shapePosY);
            this.loadNextTetromino();

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

        return lineCount;
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
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = 1;
            }
            let rndArr = this.randomNumbers(0, this.grid[i].length, numLines+1);
            
            for (let k=0; k<rndArr.length; k++) {
                this.grid[i][rndArr[k]] = 0;
            }
        }

        this.currentTetromino.posY -= numLines;
        if (this.currentTetromino.posY < 0) {
            this.currentTetromino.posY = 0;
        }
    }

    shiftWholeGridUp(numRows) {
        for (let i = 0; i < this.grid.length - numRows; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                this.grid[i][j] = this.grid[i+numRows][j];
            }
        }
    }

    randomNumbers(min, max, count) {
        let rndArr = [];

        for (let i = 0; i < count; i++) {
            rndArr.push(Math.floor(Math.random() * max) + min);
        }

        return rndArr;
    }
}




module.exports = Tetris;