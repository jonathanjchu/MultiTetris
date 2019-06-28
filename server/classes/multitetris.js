const Tetris = require('./tetris');

class MultiTetris {
    constructor() {
        this.players = {}; // { id: Tetris }
        this.gameLoopTimer = null;
        this.loopInterval = 800;
    }

    startGame(players) {
        for (let i=0; i<players.length; i++) {
            this.players[players[i].id] = new Tetris(players[i].id, players[i].username);
        }
    }

    gameLoop() {
        for (let key in this.players) {
            if (this.players.hasOwnProperty(key)) {
                this.players[key].gameLoop();
            }
        }
    }

    keyPress(id, keyCode) {
        let linesRemoved = this.players[id].handleKeyPress(keyCode);
     
        if (linesRemoved > 1) {
            this.addGarbageLines(data.id, linesRemoved-1);
        }

    }

    addGarbageLines(id, numLines) {
        for (let key in this.players) {
            if (this.players.hasOwnProperty(key) && key !== id) {
                this.players[key].addGarbageLines(numLines);
            }
        }
    }

    removePlayer(id) {
        if (id in this.players) {
            delete this.players[id];
        }
    }

    getAllBoards() {
        let gameState = {};

        for (let key in this.players) {

            if (this.players.hasOwnProperty(key) && this.players[key].username.length > 0) {

                gameState[key] = {
                    username: this.players[key].username,
                    board: this.players[key].getBoardAndTetromino(),
                    linesRemoved: this.players[key].linesRemoved
                };
            }
        }

        return gameState;
    }

}

module.exports = MultiTetris;