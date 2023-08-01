import ILogin from './login.type';

class LocalStorage {
	static getItem(item: string): ILogin {
		if (typeof window !== 'undefined') {
			const str = localStorage.getItem(item);
			if (!str) {
				return { id: null, pw: null };
			}
			const [id, pw] = str.split('*');
			return { id, pw };
		}
	}

	static setItem(item: string, value: string): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem(item, value);
		}
	}

	static removeItem(item: string): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(item);
		}
	}
}

export default LocalStorage;
