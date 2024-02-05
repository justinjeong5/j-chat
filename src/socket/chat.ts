let socket;

export default function registerChatSocket(s) {
    socket = s;
}

export const sendChat = data => {
    if (socket) {
        console.log("sendChat", data);
        socket.emit("submitMessage", data);
    }
};

export const subscribeChat = callback => {
    if (socket) {
        socket.on("returnMessage", ({ chat }) => {
            console.log("returnMessage", chat);
            callback(chat);
        });
    }
};
