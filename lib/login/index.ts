import { useState } from "react";
import LocalStorage from "lib/login/localStorage";
import hash from "hash.js";

const useLogin = () => {
    const jUserDb = LocalStorage.getUser("j-user-db");
    const jUser = LocalStorage.getUser("j-user");
    const [isLoggedIn, setIsLoggedIn] = useState(
        jUserDb?.id === jUser?.id && jUserDb?.pw === jUser?.pw,
    );

    const signUp = (email: string, password: string) => {
        const userInfo = [
            email,
            hash.sha256().update(password).digest("hex"),
        ].join("*");
        LocalStorage.setItem("j-user-db", userInfo);
        logout();
    };

    const login = (email: string, password: string) => {
        const { id, pw } = LocalStorage.getUser("j-user-db");
        const hashedPw = hash.sha256().update(password).digest("hex");
        if (id === email && pw === hashedPw) {
            const userInfo = [email, hashedPw].join("*");
            LocalStorage.setItem("j-user", userInfo);
            setIsLoggedIn(true);
            return;
        }
    };

    const logout = () => {
        LocalStorage.removeItem("j-user");
        setIsLoggedIn(false);
    };

    return {
        isLoggedIn,
        login,
        logout,
        signUp,
    };
};

export default useLogin;
