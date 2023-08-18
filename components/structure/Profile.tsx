import { Avatar, Button, Space } from "antd";
import useLogin from "lib/login";
import md5 from "md5";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { styled } from "styled-components";

const Container = styled.div``;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: ${({ theme: { SPACING } }) => SPACING.SMALL};
    gap: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

const UserName = styled.div`
    font: ${({ theme: { FONT } }) => FONT.FAMILY};
`;

const SpaceWrapper = styled(Space)`
    display: flex;
    justify-content: end;
`;

export default function Profile({ user }) {
    const router = useRouter();
    const { logout } = useLogin();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const getAvatarImage = userToken =>
        `https://gravatar.com/avatar/${md5(userToken)}?d=identicon`;

    return (
        <Container>
            <Wrapper>
                <Avatar src={getAvatarImage(user.email)} />
                <UserName>{user.email}</UserName>
            </Wrapper>
            <SpaceWrapper>
                <Space>
                    <Button type="primary">Edit Profile</Button>
                    <Button type="primary" onClick={handleLogout}>
                        Log Out
                    </Button>
                </Space>
            </SpaceWrapper>
        </Container>
    );
}

Profile.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,
};
