import { io } from "socket.io-client";
import registerChatSocket from "socket/chat";

let socket;

export const detectError = () => {
    if (socket) {
        socket.on("SocketError", error => {
            console.error(error);
        });
    }
};
export const initiateSocket = () => {
    console.log("initiateSocket");
    socket = io(process.env.NEXT_PUBLIC_SOCKET_API, { withCredentials: true });

    registerChatSocket(socket);
    detectError();
};
export const disconnectSocket = () => {
    if (socket) {
        console.log("disconnectSocket");
        socket.disconnect();
    }
};
