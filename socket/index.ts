import registerChatSocket from "@socket/chat";
import registerChatTypingSocket from "@socket/chatTyping";
import registerRoomSocket from "@socket/room";
import { io } from "socket.io-client";

let socket;

export const detectError = () => {
    if (socket) {
        socket.on("SocketError", error => {
            console.error(error);
        });
    }
};
export const initiateSocket = () => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_API as string, {
        withCredentials: true,
        transports: ["websocket"],
    });

    registerChatSocket(socket);
    registerChatTypingSocket(socket);
    registerRoomSocket(socket);
    detectError();
};
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};
