import LocalStorage from "@lib/local-storage";

const rememberKey = "j-chat-last-visited-page-remember";

const usePageRemember = () => {
    const lastPage = LocalStorage.getItem(rememberKey);

    const rememberPage = (email: string) => {
        LocalStorage.setItem(rememberKey, email);
    };
    const forgetPage = () => {
        LocalStorage.removeItem(rememberKey);
    };

    return {
        lastPage,
        rememberPage,
        forgetPage,
    };
};

export default usePageRemember;
