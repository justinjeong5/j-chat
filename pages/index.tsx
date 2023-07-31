import AppFrame from '../components/layout/AppFrame';

export default function Page() {
	return (
		<AppFrame
			menu={<div>Menu</div>}
			header={<div>Header</div>}
			footer={<div>Footer</div>}>
			<div>Content</div>
		</AppFrame>
	);
}
