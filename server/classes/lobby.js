
class Lobby {
    constructor() {
        this.waitingPlayers = [];
    }

    queuePlayer(id, username) {
        if (!this.doesUserNameExist(username)) {
            this.waitingPlayers.push(new WaitingPlayers(id, username));
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
}

class WaitingPlayers {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

    getObject() {
        return {
            id: this.id,
            username: this.username
        };
    }
}


module.exports = Lobby;