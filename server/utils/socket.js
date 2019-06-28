const socketio = require('socket.io');
const ChatRoom = require('../classes/chatroom');
// const Tetris = require('../classes/tetris');
const Lobby = require('../classes/lobby');
const MultiTetris = require('../classes/multitetris');

var chat = new ChatRoom();
var lobby = new Lobby();
var gameLoopTick = 800;
// var players = {};
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

    var tetrisGame = new MultiTetris();

    const usernameIO = io.of('/usernames');
    usernameIO.on('connection', socket => {
        socket.on('set_username', data => {

            if (lobby.isCountingDown || gameStillGoingOn()) {
                socket.emit('user_too_late');
            }
            else {
                if (!isUserExist(data.username)) {
                    // console.log(data.username);

                    let id = socket.id.substring(socket.id.indexOf('#') + 1);
                    console.log(id);

                    lobby.addPlayer(id, data.username);

                    socket.emit('confirm_username', {
                        id: id
                    });
                }
                else {
                    socket.emit('username_used');
                }
            }
        });
    });

    const chatIO = io.of('/chat');
    chatIO.on('connection', socket => {
        let id = parseID(socket.id);

        let messages = chat.getAllMessages();
        let msgArr = [];

        for (let i = 0; i < messages.length; i++) {
            msgArr.push({
                username: messages[i].username,
                message: messages[i].message,
                timestamp: messages[i].timestamp
            });
        }

        socket.emit('get_all_messages', {
            messages: msgArr
        });

        socket.on('send_new_message', data => {
            chat.addNewMessage(data.username, data.message.substring(0, 64));

            let lastMsg = chat.getLatestMessage();
            console.log(lastMsg);

            socket.broadcast.emit('receive_new_message', {
                username: lastMsg.username,
                message: lastMsg.message,
                timestamp: lastMsg.timestamp
            });
        });
    });

    const lobbyIO = io.of('/lobby');
    lobbyIO.on('connection', socket => {
        let id = parseID(socket.id);
        console.log(id + " has entered the lobby");

        socket.on('joining_lobby', data => {
            let username = lobby.getUsernameByID(data.id);

            // check username found
            if (username) {
                socket.emit('confirm_join', {
                    username: username,
                    allUsers: lobby.getAllPlayers()
                });

                socket.broadcast.emit('player_joined', {
                    newuser: username,
                });
            }
        });

        socket.on('player_set_ready', data => {
            lobby.setToReady(data.id);

            socket.broadcast.emit('player_ready', {
                username: data.username,
                ready: data.ready
            });

            if (lobby.areAllPlayersReady()) {
                lobby.isCountingDown = true;

                socket.emit('lobby_countdown', {
                    countDown: 5
                });

                socket.broadcast.emit('lobby_countdown', {
                    countDown: 5
                });

                setTimeout(() => {
                    for (let i=0; i<lobby.waitingPlayers.length; i++) {
                        players[lobby.waitingPlayers[i].id] = {
                            username: lobby.waitingPlayers[i].username,
                            tetris: null,
                            gameLoop: null
                        };
                    }
                    
                    tetrisGame.startGame(lobby.getAllPlayers());
                    lobby = new Lobby();
                }, 4900);
            }
        });
    });

    const tetrisIO = io.of('/tetris');
    tetrisIO.on('connection', (socket) => {
        let id = parseID(socket.id);
        console.log(id + " connected");

        socket.on('start_game', data => {
            console.log(data.id);

            

            if (data.id in players) {

                players[data.id].tetris = new Tetris();

                players[data.id].gameLoop = setInterval(() => {

                    // console.log(players);

                    if (players[data.id]) {
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
                            });
                        }
                    }

                }, gameLoopTick);
            }
        });

        socket.on('key_press', data => {
            tetrisGame.keyPress(data.id);
            if (data.id in players) {
                if (players[data.id].tetris) {
                    let linesRemoved = players[data.id].tetris.handleKeyPress(data.keyCode);

                    if (linesRemoved > 1) {
                        addGarbageLines(data.id, linesRemoved);
                    }

                    let gameState = getGameState();

                    socket.emit('game_state', {
                        gameState: gameState
                    });
                }
            }
        });

        socket.on('leave_game', data => { 
            let id = data.id;

            tetrisGame.removePlayer(id);
        });

        socket.on('disconnect', data => {
            let id = parseID(socket.id);
            console.log(id + " disconnected");
        });

    });
}

function addGarbageLines(id, linesRemoved) {
    let numLines = 0;
    if (linesRemoved === 4) {
        numLines = 4;
    }
    else {
        numLines = linesRemoved - 1;
    }

    for (let key in players) {
        if (players.hasOwnProperty(key) && key !== id) {
            players[key].tetris.addGarbageLines(numLines);
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
        if (players.hasOwnProperty(key) && players[key].username.length > 0 && players[key].tetris) {
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

function gameStillGoingOn() {
    let numActivePlayers = 0;

    for (let key in players) {
        if (players.hasOwnProperty(key) && !players[key].tetris.isGameOver) {
            numActivePlayers++;

            if (numActivePlayers > 1) {
                return true;
            }
        }
    }

    return false;
}