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
    socket = io(process.env.NEXT_PUBLIC_SOCKET_API, {
        withCredentials: true,
        transports: ["websocket"],
    });

    registerChatSocket(socket);
    detectError();
};
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};
