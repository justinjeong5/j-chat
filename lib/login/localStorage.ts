import ILogin from "lib/login/login.type";

class LocalStorage {
    static getUser(item: string): ILogin {
        const emptyState = { id: null, pw: null };
        if (typeof window !== "undefined") {
            const str = localStorage.getItem(item);
            if (!str) {
                return emptyState;
            }
            const [id, pw] = str.split("*");
            return { id, pw };
        }
        return emptyState;
    }

    static getItem(item: string): string {
        if (typeof window !== "undefined") {
            return localStorage.getItem(item);
        }
        return null;
    }

    static setItem(item: string, value: string): void {
        if (typeof window !== "undefined") {
            localStorage.setItem(item, value);
        }
    }

    static removeItem(item: string): void {
        if (typeof window !== "undefined") {
            localStorage.removeItem(item);
        }
    }
}

export default LocalStorage;
