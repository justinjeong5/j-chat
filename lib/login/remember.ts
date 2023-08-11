import { useEffect, useState } from 'react';
import LocalStorage from './localStorage';

const useRemember = () => {
	const userEmail = LocalStorage.getItem('j-user-remember');

	const localStorageChecked = LocalStorage.getItem('j-user-remember-checked');
	const [checked, internalSetChecked] = useState(
		localStorageChecked === 'true'
	);

	useEffect(() => {
		console.log({ checked });
	}, [checked]);

	const remember = (email: string) => {
		LocalStorage.setItem('j-user-remember', email);
	};
	const forget = () => {
		LocalStorage.removeItem('j-user-remember');
	};

	const setChecked = (checked) => {
		internalSetChecked(checked);
		LocalStorage.setItem('j-user-remember-checked', checked);
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
