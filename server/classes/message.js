
class Message {
    constructor(username, message) {
        this.username = username;
        this.message = message;
        this.timestamp = Date.now();
    }

    
}

module.exports = Message;