const socketio = require('socket.io');
const ChatRoom = require('../classes/chatroom');
const Lobby = require('../classes/lobby');
const MultiTetris = require('../classes/multitetris');

var chat = new ChatRoom();
var lobby = new Lobby();
var lobbyTimer = null;
var gameLoopTick = 800;
var tetrisGame = new MultiTetris();

var gameTimers = {};
// key: id; value: Timer


module.exports = function (server) {
    const io = socketio(server);

    const usernameIO = io.of('/usernames');
    usernameIO.on('connection', socket => {
        socket.on('set_username', data => {

            if (lobby.isCountingDown || tetrisGame.isGameStillGoingOn()) {
                socket.emit('user_too_late');
            }
            else {
                if (!lobby.doesUserNameExist(data.username)) {

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

                // timer before starting game; wait 5 seconds (actually 4.9 sec) and then start game
                setTimeout(() => {                    
                    // start game for everyone now that 5 sec countdown is finished
                    tetrisGame.addPlayers(lobby.getAllPlayers());

                    // create new lobby
                    lobby.destroy();
                    lobby = new Lobby();

                }, 4900);
            }
        });

        lobbyTimer = setInterval(() => {
            console.log("timeout tick");

            let removedPlayers = lobby.checkIfPlayersTimedOut();
            if (removedPlayers.length > 0)
            {
                removedPlayers.forEach(p => {
                    console.log("removed player " + p);
                    socket.broadcast.emit('player_left', {
                        quitter: p,
                    });
                });
            }
        }, 30000);
    });




    const tetrisIO = io.of('/tetris');
    tetrisIO.on('connection', (socket) => {
        let id = parseID(socket.id);
        console.log(id + " connected to tetris");
        

        socket.on('confirm_in_game', data => {
            console.log(data.id);

            // start game loop for this player (who just connected)
            gameTimers[data.id] =
                    setInterval(() => {
                        tetrisGame.playerLoop(data.id);

                        if (tetrisGame.isGameOverForPlayer(data.id)) {
                            // game over for player
                            socket.emit('game_over', { isGameOver: true });
                            clearInterval(gameTimers[data.id]);
                        }
                        else {
                            // update game information

                            let gameState = tetrisGame.getGameState();

                            socket.emit('game_state', {
                                gameState: gameState,
                                id: data.id
                            });
                        }

                    }, gameLoopTick);

        });

        socket.on('key_press', data => {
            tetrisGame.keyPress(data.id, data.keyCode);

            socket.emit('game_state', {
                gameState: tetrisGame.getGameState(),
                id: data.id
            });
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

function parseID(socketid) {
    return socketid.substring(socketid.indexOf('#') + 1);
}
