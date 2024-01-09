class LocalStorage {
    static getItem(item: string): string | null {
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
