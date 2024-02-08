import LocalStorage from "@lib/local-storage";

const rememberKey = "j-chat-hide-message-tour";

const useTourRemember = () => {
    const tour = LocalStorage.getItem(rememberKey);

    const rememberTour = (email: string) => {
        LocalStorage.setItem(rememberKey, email);
    };
    const forgetTour = () => {
        LocalStorage.removeItem(rememberKey);
    };

    return {
        tour,
        rememberTour,
        forgetTour,
    };
};

export default useTourRemember;
