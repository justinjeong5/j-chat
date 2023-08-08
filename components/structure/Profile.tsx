import { Avatar } from 'antd';
import { styled } from 'styled-components';
import md5 from 'md5';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

const UserName = styled.div`
	font: ${({ theme: { FONT } }) => FONT.FAMILY};
`;

export default function Profile({ user }) {
	const getAvatarImage = (userToken) => {
		return `https://gravatar.com/avatar/${md5(userToken)}?d=identicon`;
	};

	return (
		<Container>
			<Avatar src={getAvatarImage(user.email)} />
			<UserName>{user.email}</UserName>
		</Container>
	);
}
