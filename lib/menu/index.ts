import { v4 as uuidv4 } from 'uuid';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
	label: React.ReactNode,
	{
		icon = null,
		children,
		type = 'item',
	}: {
		icon?: React.ReactNode;
		children?: MenuItem[];
		type?: 'group' | 'item' | 'divider';
	} = {}
): MenuItem => {
	return {
		key: uuidv4(),
		icon,
		children,
		label,
		type,
	} as MenuItem;
};

export { MenuProps, getItem };
