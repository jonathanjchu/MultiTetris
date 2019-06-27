const Message = require('./message');

class ChatRoom {
    constructor() {
        this.messages = [];
    }

    addNewMessage(username, message) {
        this.messages.push(new Message(username, message));
    }

    getAllMessage() {

    }

    getLatestMessage() {
        return this.messages[this.messages.length-1];
    }

}

module.exports = ChatRoom;