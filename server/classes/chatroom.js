const Message = require('./message');

class ChatRoom {
    constructor() {
        this.messages = [];
    }

    addNewMessage(username, message) {
        this.messages.push(new Message(username, message));
    }

    getAllMessages() {
        return this.messages;
    }

    getLatestMessage() {
        return this.messages[this.messages.length-1];
    }

}

module.exports = ChatRoom;