const Tetris = require('./tetris');

class MultiTetris {
    constructor() {
        this.players = {}; // { id: Tetris }
        this.gameLoopTimer = null;
        this.loopInterval = 800;
        this.sockets = {}; // { id: socket }
    }

    addPlayers(players) {
        for (let i=0; i<players.length; i++) {
            this.players[players[i].id] = new Tetris(players[i].id, players[i].username);
        }
    }

    // gameLoop() {
    //     for (let key in this.players) {
    //         if (this.players.hasOwnProperty(key)) {
    //             this.playerLoop(key);
    //         }
    //     }
    // }

    // game loop for player of given id
    playerLoop(id)
    {
        if (id in this.players) {
            let linesRemoved = this.players[id].gameLoop();

            if (linesRemoved > 1) {
                this.addGarbageLines(id, linesRemoved-1);
            }
        }

    }

    keyPress(id, keyCode) {
        let linesRemoved = this.players[id].handleKeyPress(keyCode);
     
        if (linesRemoved > 1) {
            this.addGarbageLines(id, linesRemoved-1);
        }

    }

    // add lines to everyone except for the given id
    // id: id of player who isn't going to receive new lines
    // numLines: number of lines to add
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

    isGameOverForPlayer(id) {
        if (id in this.players) {
            return this.players[id].isGameOver;
        }
        return true;
    }

    /**
     * gets the current state of all the tetris boards in the game
     */
    getGameState() {
        let gameState = {};

        for (let key in this.players) {

            if (this.players.hasOwnProperty(key) && this.players[key].username.length > 0) {

                gameState[key] = {
                    username: this.players[key].username,
                    board: this.players[key].getBoardAndTetromino(),
                    linesRemoved: this.players[key].linesRemoved,
                    nextShape: this.players[key].getNextTetromino()
                };
            }
        }

        return gameState;
    }

    isGameStillGoingOn() {
        let isOnePlayerActiveSoFar = false;

        for (let key in this.players) {
            if (this.players.hasOwnProperty(key) && !this.players[key].isGameOver) {
                if (!isOnePlayerActiveSoFar) {
                    // found first active player
                    isOnePlayerActiveSoFar = true;
                }
                else {
                    // found a second active player, so return true
                    return true;
                }
            }
        }

        // only 1 or less active players
        return false;
    }

}

module.exports = MultiTetris;