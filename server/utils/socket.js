const socketio = require('socket.io');
const ChatRoom = require('../classes/chatroom');
const Tetris = require('../classes/tetris');
// const MultiTetris = require('../classes/multitetris');

var chat = new ChatRoom();
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

    // var tetrisGame = new MultiTetris();

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

    const chatIO = io.of('/chat');
    chatIO.on('connection', socket => {
        let id = parseID(socket.id);

        socket.emit('get_all_messages', {
            messages: chat.getAllMessage()
        });

        socket.on('send_new_message', data => {
            chat.addNewMessage(data.username, data.message);

            socket.broadcast.emit('receive_new_message', {
                message: chat.getLatestMessage()
            });
        })
    });

    const tetrisIO = io.of('/tetris');
    tetrisIO.on('connection', (socket) => {
        let id = parseID(socket.id);
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
                            let linesRemoved = players[data.id].tetris.gameLoop();

                            if (linesRemoved > 1) {
                                addGarbageLines(data.id, linesRemoved);
                            }

                            let gameState = getGameState();

                            socket.emit('game_state', {
                                gameState: gameState,
                                id: data.id
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
                    let linesRemoved = players[id].tetris.handleKeyPress(data.keyCode);


                    if (linesRemoved > 1) {
                        addGarbageLines(data.id, linesRemoved);
                    }

                    let gameState = getGameState();

                    socket.emit('game_state', {
                        gameState: gameState
                    });
                }
            }
        })

        socket.on('leave_game', data => {
            let id = parseID(socket.id);
            console.log(id + " disconnected");

            if (id in players) {
                delete players[id];
            }
        });

    });
}

function addGarbageLines(id, linesRemoved) {
    for (let key in players) {
        if (players.hasOwnProperty(key) && key !== id) {
            players[key].tetris.addGarbageLines(linesRemoved);
        }
    }
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
                linesRemoved: players[key].tetris.linesRemoved,
                nextShape: players[key].tetris.getNextTetromino()
            };
        }
    }


    return gameState;
}

function parseID(socketid) {
    return socketid.substring(socketid.indexOf('#') + 1);
}