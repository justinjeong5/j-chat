import AppFrame from '../components/layout/AppFrame';
import Menu from '../components/navigation/Menu';

export default function Page() {
	return (
		<AppFrame
			menu={<Menu />}
			header={<div>Header</div>}
			footer={<div>Footer</div>}>
			<div style={{ minHeight: '500px' }}>Content</div>
		</AppFrame>
	);
}
