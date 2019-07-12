
class Lobby {
    constructor() {
        this.waitingPlayers = []; // WaitingPlayers objects

        this.isCountingDown = false;
        this.countDownTime = 5; // 5 seconds

        //this.playerPollTimer = setInterval(this.checkIfPlayersTimedOut(), 10000);
    }

    addPlayer(id, username, socket) {
        if (!this.doesUserNameExist(username)) {
            this.waitingPlayers.push(new WaitingPlayers(id, username, socket));
        }

        this.checkIfPlayersTimedOut();
    }

    getUsernameByID(id) {
        let player = this.waitingPlayers.find(x => x.id === id);

        if (player)
            return player.username;        
    }

    setToReady(id) {
        for (let i=0; i<this.waitingPlayers.length; i++) {
            if (this.waitingPlayers[i].id === id) {
                this.waitingPlayers[i].setToReady();
                break;
            }
        }
    }

    getAllPlayers() {
        let arr = this.waitingPlayers.map(x => {
            return x.getObject();
        });
        return arr;
    }

    // check if a user with the given username is already in the lobby
    doesUserNameExist(username) {
        if (this.waitingPlayers.find(x => x.username === username)) {
            return true;
        }
        else {
            return false;
        }
    }

    areAllPlayersReady() {
        let anyNotReady = this.waitingPlayers.find(x => x.isReady === false);

        if (anyNotReady){
            return false;
        }
        else {
            return true;
        }
    }

    /**
     * checks if players have been sitting in the lobby for a long period of time
     * and remove them if they have
     * 
     * returns true if any players were removed, otherwise false
     */
    checkIfPlayersTimedOut() {
        // let timeoutTime = 120000; // 2 min
        let timeoutTime = 45000;
        let now = Date.now();
        let removedPlayers = [];


        for (let i=0; i<this.waitingPlayers.length; i++) {
            if (now - this.waitingPlayers[i].enterTime > timeoutTime) {
                removedPlayers.push(this.waitingPlayers.splice(i).username);
                i--;
            }
        }
        
        return removedPlayers;
    }

    destroy() {
        clearInterval(this.playerPollTimer);
        if (this.socket) {
            this.socket.close();
        }
    }
}

class WaitingPlayers {
    constructor(id, username, socket) {
        this.id = id;
        this.username = username;
        this.isReady = false;
        this.enterTime = Date.now();
        this.socket = socket;
    }

    setToReady() {
        this.isReady = true;
    }

    getObject() {
        return {
            id: this.id,
            username: this.username,
            isReady: this.isReady
        };
    }
}


module.exports = Lobby;