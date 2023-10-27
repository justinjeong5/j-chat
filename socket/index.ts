import { io } from "socket.io-client";
import initChatSocket from "socket/chat";

let socket;

export const initiateSocket = () => {
    socket = io(process.env.NEXT_PUBLIC_API, { withCredentials: true });
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

const chat = initChatSocket(socket);
export { chat };
