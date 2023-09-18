import { Avatar, Button, Space } from "antd";
import useLogin from "hooks/login";
import md5 from "md5";
import { useRouter } from "next/router";
import { styled } from "styled-components";

const Container = styled.div``;

const LayoutWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${({ theme: { SPACING } }) => SPACING.SMALLER};
    gap: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

const TextWrapper = styled.div`
    font: ${({ theme: { FONT } }) => FONT.FAMILY};
`;

const SpaceWrapper = styled(Space)`
    display: flex;
    justify-content: end;
    margin-top: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

export default function Profile({ user }) {
    const router = useRouter();
    const { logout } = useLogin();

    const getAvatarImage = (userToken = "") =>
        `https://gravatar.com/avatar/${md5(userToken)}?d=identicon`;

    const handleEdit = () => {
        router.push("/users/setting");
    };

    return (
        <Container>
            <LayoutWrapper>
                <Avatar src={getAvatarImage(user.email)} />
                <TextWrapper>{user.username}</TextWrapper>
            </LayoutWrapper>
            <TextWrapper>{user.email}</TextWrapper>
            <SpaceWrapper>
                <Space>
                    <Button type="primary" onClick={handleEdit}>
                        Edit Profile
                    </Button>
                    <Button type="primary" onClick={logout}>
                        Log Out
                    </Button>
                </Space>
            </SpaceWrapper>
        </Container>
    );
}
