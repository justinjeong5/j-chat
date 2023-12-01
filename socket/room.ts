let socket;

export default function registerRoomSocket(s) {
    socket = s;
}

export const joinRoom = data => {
    if (socket) {
        console.log("joinRoom", data);
        socket.emit("joinRoom", data);
    }
};

export const leaveRoom = data => {
    if (socket) {
        console.log("leaveRoom", data);
        socket.emit("leaveRoom", data);
    }
};

export const subscribeReturnRoom = callback => {
    if (socket) {
        socket.on("returnRoom", ({ user, status }) => {
            console.log("returnRoom", { user, status });
            callback(user, status);
        });
    }
};
