import { Divider, Menu } from 'antd';
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import Profile from '../structure/Profile';
import userData from '../../db/user.json';
import { MenuProps, getItem } from '../../lib/menu';

const Container = styled.div`
	padding: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

export default function Page() {
	const items: MenuProps['items'] = [
		getItem('Navigation One', {
			icon: <MailOutlined />,
			children: [
				getItem('Item 1', {
					children: [getItem('Option 1'), getItem('Option 2')],
				}),
				getItem('Item 2', {
					children: [getItem('Option 3'), getItem('Option 4')],
				}),
			],
		}),
		getItem('Navigation Two', {
			icon: <AppstoreOutlined />,
			children: [getItem('Option 5'), getItem('Option 6')],
		}),
		getItem(null, { type: 'divider' }),
		getItem('Navigation Three', {
			icon: <SettingOutlined />,
			children: [
				getItem('Option 9'),
				getItem('Option 10'),
				getItem('Option 11'),
				getItem('Option 12'),
			],
		}),
		getItem('Group', {
			children: [getItem('Option 13'), getItem('Option 14')],
		}),
	];

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
	};

	return (
		<Container>
			<Profile user={userData} />
			<Divider />
			<Menu
				onClick={onClick}
				style={{ width: 256 }}
				mode='inline'
				items={items}
			/>
		</Container>
	);
}
