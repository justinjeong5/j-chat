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
        socket.on("returnMessage", data => {
            console.log("returnMessage", data);
            callback(data);
        });
    }
};
