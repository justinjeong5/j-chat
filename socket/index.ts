import { io } from "socket.io-client";
import registerChatSocket from "socket/chat";

let socket;

export const initiateSocket = () => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_API, { withCredentials: true });
    console.log("Socket Connection", socket.id);

    registerChatSocket(socket);
};
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};
export const detectError = () => {
    if (socket) {
        socket.on("SocketError", error => {
            console.error(error);
        });
    }
};
