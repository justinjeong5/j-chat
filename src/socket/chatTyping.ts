let socket;

export default function registerChatTypingSocket(s) {
    socket = s;
}

export const typingChat = (roomId, user) => {
    if (socket) {
        socket.emit("typingMessage", { roomId, user });
    }
};

export const subscribeTyping = callback => {
    if (socket) {
        socket.on("typingMessage", ({ user }) => {
            callback(user);
        });
    }
};

export const typingDone = (roomId, user) => {
    if (socket) {
        socket.emit("typingDone", { roomId, user });
    }
};

export const subscribeTypingDone = callback => {
    if (socket) {
        socket.on("typingDone", ({ user }) => {
            callback(user);
        });
    }
};
