const Tetris = require('./tetris');

class MultiTetris {
    constructor() {
        this.players = {};
        this.gameLoopTimer = null;
        this.loopInterval = 800;

        this.lobby = {};
    }

    addPlayer(id, username) {
        if (!this.doesUserNameExist(username)) {
            this.lobby[id] = username;
            return true;
        }
        else {
            return false;
        }
    }

    startGame() {
        for (let key in this.lobby) {
            if (this.lobby.hasOwnProperty(key)) {
                this.players[key] = new Tetris(this.lobby[key]);
            }
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
        this.players[id].keyPress(keyCode);
    }

    removePlayer(id) {
        delete this.players[id];
    }

    doesUserNameExist(username) {
        for (let key in this.lobby) {
            if (this.lobby.hasOwnProperty(key)) {
                if (this.lobby[key] === username)
                    return true;
            }
        }
        return false;
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

    isGameStillGoingOn() {
        let isAnyPlayerActive = false;

        for (let key in this.players) {
            if (this.players.hasOwnProperty(key) && !this.players[key].isGameOver) {
                if (!isAnyPlayerActive) {
                    isAnyPlayerActive = true;
                }
                else {
                    return true;
                }
            }
        }

        return true;
    }

}

module.exports = MultiTetris;