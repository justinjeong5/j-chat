import AppFrame from '../components/layout/AppFrame';
import useLogin from '../lib/login';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import { useRouter } from 'next/router';

export default function Page() {
	const router = useRouter();

	const { isLoggedIn, logout } = useLogin();
	if (!isLoggedIn) {
		router.push('/login');
	}

	return (
		<AppFrame
			menu={
				<div>
					<Button
						type='primary'
						icon={<PoweroffOutlined />}
						onClick={logout}
					/>
				</div>
			}
			header={<div>Header</div>}
			footer={<div>Footer</div>}>
			<div>Content</div>
		</AppFrame>
	);
}
