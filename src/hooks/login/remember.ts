import LocalStorage from "@hooks/login/localStorage";
import { useState } from "react";

const useRemember = () => {
    const [checked, internalSetChecked] = useState(
        JSON.parse(LocalStorage.getItem("j-user-remember-checked") || "false"),
    );
    const userEmail = LocalStorage.getItem("j-user-remember");

    const remember = (email: string) => {
        LocalStorage.setItem("j-user-remember", email);
    };
    const forget = () => {
        LocalStorage.removeItem("j-user-remember");
    };

    const setChecked = v => {
        internalSetChecked(v);
        LocalStorage.setItem("j-user-remember-checked", JSON.stringify(v));
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
