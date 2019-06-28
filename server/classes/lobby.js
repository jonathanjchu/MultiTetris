
class Lobby {
    constructor() {
        this.waitingPlayers = [];

        this.isCountingDown = false;
    }

    addPlayer(id, username) {
        if (!this.doesUserNameExist(username)) {
            this.waitingPlayers.push(new WaitingPlayers(id, username));
        }
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
}

class WaitingPlayers {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.isReady = false;
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