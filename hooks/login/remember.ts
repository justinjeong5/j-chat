import LocalStorage from "hooks/login/localStorage";
import { useState } from "react";

const useRemember = () => {
    const userEmail = LocalStorage.getItem("j-user-remember");

    const localStorageChecked = LocalStorage.getItem("j-user-remember-checked");
    const [checked, internalSetChecked] = useState(
        localStorageChecked === "true",
    );

    const remember = (email: string) => {
        LocalStorage.setItem("j-user-remember", email);
    };
    const forget = () => {
        LocalStorage.removeItem("j-user-remember");
    };

    const setChecked = v => {
        internalSetChecked(v);
        LocalStorage.setItem("j-user-remember-checked", v);
    };

    return {
        userEmail,
        remember,
        forget,
        checked,
        setChecked,
    };
};

export default useRemember;
