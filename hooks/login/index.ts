import LocalStorage from "hooks/login/localStorage";
import { useState } from "react";

const useLogin = () => {
    const jUserToken = LocalStorage.getItem("j-user-token");
    const [isLoggedIn, setIsLoggedIn] = useState(!!jUserToken);

    const logout = () => {
        LocalStorage.removeItem("j-user-token");
        setIsLoggedIn(false);
    };

    return {
        isLoggedIn,
        logout,
    };
};

export default useLogin;
