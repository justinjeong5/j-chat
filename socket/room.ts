let socket;

export default function registerRoomSocket(s) {
    socket = s;
}

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
