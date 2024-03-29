let socket;

export default function registerChatSocket(s) {
    socket = s;
}

export const sendChat = data => {
    if (socket) {
        socket.emit("submitMessage", data);
    }
};

export const subscribeChat = callback => {
    if (socket) {
        socket.on("returnMessage", ({ chat }) => {
            callback(chat);
        });
    }
};

export const unsubscribeChat = () => {
    if (socket) {
        socket.off("returnMessage");
    }
};
