"use client";

import registerChatSocket from "@socket/chat";
import registerChatTypingSocket from "@socket/chatTyping";
import registerRoomSocket from "@socket/room";
import registerUserSocket from "@socket/user";
import { io } from "socket.io-client";

let socket;

export const detectError = () => {
    if (socket) {
        socket.on("SocketError", error => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
    }
};
export const initiateSocket = () => {
    if (!socket || !socket.connected) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_API as string, {
            withCredentials: true,
            transports: ["websocket"],
        });

        registerChatSocket(socket);
        registerChatTypingSocket(socket);
        registerRoomSocket(socket);
        registerUserSocket(socket);
        detectError();
    }
};
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};
