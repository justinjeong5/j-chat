import LocalStorage from "@lib/local-storage";
import { useState } from "react";

const hideKey = "j-chat-message-tour";

const useTourRemember = () => {
    const [messageTour, setMessageTour] = useState(
        JSON.parse(LocalStorage.getItem(hideKey) || "true"),
    );

    const forgetTour = () => {
        LocalStorage.setItem(hideKey, "false");
        setMessageTour(false);
    };

    return {
        messageTour,
        forgetTour,
    };
};

export default useTourRemember;
