export default function initChatSocket(socket) {
    const sendChat = data => {
        if (socket) {
            socket.emit("submitMessage", data);
        }
    };
    return {
        sendChat,
    };
}
