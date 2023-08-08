import { useState } from 'react';
import LocalStorage from './localStorage';
import hash from 'hash.js';

const useLogin = () => {
	const jUserDb = LocalStorage.getItem('j-user-db');
	const jUser = LocalStorage.getItem('j-user');
	const [isLoggedIn, setIsLoggedIn] = useState(
		jUserDb?.id === jUser?.id && jUserDb?.pw === jUser?.pw
	);

	const signUp = (username: string, password: string) => {
		const userInfo = [
			username,
			hash.sha256().update(password).digest('hex'),
		].join('*');
		LocalStorage.setItem('j-user-db', userInfo);
		logout();
	};

	const login = (username: string, password: string) => {
		const { id, pw } = LocalStorage.getItem('j-user-db');
		const hashedPw = hash.sha256().update(password).digest('hex');
		if (id === username && pw === hashedPw) {
			const userInfo = [username, hashedPw].join('*');
			LocalStorage.setItem('j-user', userInfo);
			setIsLoggedIn(true);
			return;
		}
	};

	const logout = () => {
		LocalStorage.removeItem('j-user');
		setIsLoggedIn(false);
	};

	return {
		isLoggedIn,
		login,
		logout,
		signUp,
	};
};

export default useLogin;
