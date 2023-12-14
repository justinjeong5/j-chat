import { Avatar, Button, Space } from "antd";
import useLogin from "hooks/login";
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

    const handleUserInformation = () => {
        router.push("/user/detail");
    };

    return (
        <Container>
            <LayoutWrapper>
                <Avatar src={user.avatar} />
                <TextWrapper>{user.username}</TextWrapper>
            </LayoutWrapper>
            <TextWrapper>{user.email}</TextWrapper>
            <SpaceWrapper>
                <Space>
                    <Button type="primary" onClick={handleUserInformation}>
                        사용자 관리
                    </Button>
                    <Button type="primary" onClick={logout}>
                        로그아웃
                    </Button>
                </Space>
            </SpaceWrapper>
        </Container>
    );
}
