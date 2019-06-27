const socketio = require('socket.io');
const Tetris = require('../classes/tetris.js');

var gameLoopTick = 800;
var players = {};
/*
key: socket.id
{
    username:
    tetris: 
    gameLoop:
}
*/

module.exports = function (server) {
    const io = socketio(server);

    const usernameIO = io.of('/usernames');
    usernameIO.on('connection', socket => {
        socket.on('set_username', data => {
            if (!isUserExist(data.username)) {
                // console.log(data.username);

                let id = socket.id.substring(socket.id.indexOf('#') + 1);
                console.log(id);

                players[id] = {
                    username: data.username,
                    tetris: null,
                    gameLoop: null
                }
                socket.emit('confirm_username', {
                    status: 200,
                    id: id
                });
            }
            else {
                socket.emit('username_used');
            }
        });

    });

    const tetrisIO = io.of('/tetris');
    tetrisIO.on('connection', (socket) => {
        let id = socket.id.substring(socket.id.indexOf('#') + 1);
        console.log(id + " has connected");

        socket.on('start_game', data => {
            console.log(data.id);
            if (data.id in players) {

                players[data.id].tetris = new Tetris();

                players[data.id].gameLoop = setInterval(() => {

                    // console.log(players);

                    if (players[data.id]) { // TODO: figure out where extra socket connections are coming from
                        if (players[data.id].tetris.isGameOver) {
                            socket.emit('game_over', { isGameOver: true });
                            clearInterval(players[data.id].gameLoop);
                        }
                        else {
                            players[data.id].tetris.gameLoop();

                            let gameState = getGameState();

                            socket.emit('game_state', {
                                gameState: gameState
                                // gameState: players
                            });
                        }
                    }

                }, gameLoopTick);

            }
        });

        socket.on('key_press', data => {
            if (data.id in players) {
                if (players[data.id].tetris) {
                    players[data.id].tetris.handleKeyPress(data.keyCode);

                    let gameState = getGameState();

                    socket.emit('game_state', {
                        gameState: gameState
                    });
                }
            }
        })

        socket.on('leave_game', data => {
            let id = socket.id.substring(socket.id.indexOf('#') + 1);
            console.log(socket.id + " disconnected");

            if (id in players) {
                delete players[id];
            }
        });

        // console.log(socket.id + " connected");
        // players[socket.id] = {
        //     username: "",
        //     ip_address: "",
        //     tetris: tetris,
        //     gameLoop: gameLoop
        // };

    });
}

function isUserExist(username) {
    for (let key in players) {
        if (players.hasOwnProperty(key)) {
            if (players[key].username === username)
                return true;
        }
    }
    return false;
}


function getGameState() {
    let gameState = {};

    for (let key in players) {
        // console.log(key);
        if (players.hasOwnProperty(key) && players[key].username.length > 0) {
            // console.log(players[key]);
            gameState[key] = {
                username: players[key].username,
                board: players[key].tetris.getBoardAndTetromino(),
                linesRemoved: players[key].tetris.linesRemoved
            };
        }
    }

    // console.log(gameState);

    return gameState;
}