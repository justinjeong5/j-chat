import LocalStorage from "@lib/local-storage";
import { useState } from "react";

const rememberKey = "j-chat-user-remember";
const rememberCheckedKey = "j-chat-user-remember-checked";

const useLoginRemember = () => {
    const [checked, internalSetChecked] = useState(
        JSON.parse(LocalStorage.getItem(rememberCheckedKey) || "false"),
    );
    const userEmail = LocalStorage.getItem(rememberKey);

    const remember = (email: string) => {
        LocalStorage.setItem(rememberKey, email);
    };
    const forget = () => {
        LocalStorage.removeItem(rememberKey);
    };

    const setChecked = v => {
        internalSetChecked(v);
        LocalStorage.setItem(rememberCheckedKey, JSON.stringify(v));
    };

    return {
        userEmail,
        remember,
        forget,
        checked,
        setChecked,
    };
};

export default useLoginRemember;
