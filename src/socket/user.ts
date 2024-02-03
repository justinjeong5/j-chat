let socket;

export default function registerUserSocket(s) {
    socket = s;
}

export const emitUserLogin = data => {
    if (socket) {
        socket.emit("userLogin", data);
    }
};

export const subscribeUserLogin = callback => {
    if (socket) {
        socket.on("userLogin", ({ user }) => {
            callback(user);
        });
    }
};

export const emitUserLogout = data => {
    if (socket) {
        socket.emit("userLogout", data);
    }
};

export const subscribeUserLogout = callback => {
    if (socket) {
        socket.on("userLogout", ({ user }) => {
            callback(user);
        });
    }
};
