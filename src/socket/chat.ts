let socket;

export default function registerChatSocket(s) {
    socket = s;
}

export const sendChat = data => {
    if (socket) {
        console.log("submitMessage", data);
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
