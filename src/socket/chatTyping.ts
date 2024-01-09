let socket;

export default function registerChatTypingSocket(s) {
    socket = s;
}

export const typingChat = (roomId, username) => {
    if (socket) {
        socket.emit("typingMessage", { roomId, username });
    }
};

export const subscribeTyping = callback => {
    if (socket) {
        socket.on("typingMessage", ({ user }) => {
            callback(user);
        });
    }
};

export const typingDone = (roomId, username) => {
    if (socket) {
        socket.emit("typingDone", { roomId, username });
    }
};

export const subscribeTypingDone = callback => {
    if (socket) {
        socket.on("typingDone", ({ user }) => {
            callback(user);
        });
    }
};
