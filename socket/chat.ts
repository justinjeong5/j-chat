let socket;

export default function registerChatSocket(s) {
    socket = s;
    s.on("hello", data => {
        console.log("hello", data);
    });
}

export const sendChat = data => {
    console.log("sendChat", data);
    if (socket) {
        console.log("emit, submitMessage");
        socket.emit("submitMessage", data);
    }
};
