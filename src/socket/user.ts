let socket;

export default function registerUserSocket(s) {
    socket = s;
}

export const emitUserLogin = data => {
    if (socket) {
        socket.emit("emitLogin", data);
    }
};

export const subscribeUserLogin = callback => {
    if (socket) {
        socket.on("returnLogin", ({ user }) => {
            callback(user);
        });
    }
};

export const emitUserLogout = data => {
    if (socket) {
        socket.emit("emitLogout", data);
    }
};

export const subscribeUserLogout = callback => {
    if (socket) {
        socket.on("returnLogout", ({ user }) => {
            callback(user);
        });
    }
};
