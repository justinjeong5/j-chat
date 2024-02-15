import { TRoom } from "@t/room.type";

let socket;

export default function registerRoomSocket(s) {
    socket = s;
}

export const enterRoom = roomId => {
    if (socket) {
        socket.emit("enterRoom", { roomId });
    }
};

export const exitRoom = roomId => {
    if (socket) {
        socket.emit("exitRoom", { roomId });
    }
};

export const joinRoom = (roomId, userId) => {
    if (socket) {
        socket.emit("joinRoom", { roomId, userId });
    }
};

export const leaveRoom = (roomId, userId) => {
    if (socket) {
        socket.emit("leaveRoom", { roomId, userId });
    }
};

export const roomPosting = (room: TRoom) => {
    if (socket) {
        socket.emit("roomPosting", room);
    }
};

export const subscribeRoomPosted = callback => {
    if (socket) {
        socket.on("roomPosted", room => {
            callback(room);
        });
    }
};
