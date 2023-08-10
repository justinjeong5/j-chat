import AppFrame from '../components/layout/AppFrame';
import Menu from '../components/navigation/Menu';
import Chat from '../components/structure/chat/Chat';

export default function Page() {
	return (
		<AppFrame
			menu={<Menu />}
			header={<div>Header</div>}
			footer={<div>Footer</div>}>
			<Chat />
		</AppFrame>
	);
}
