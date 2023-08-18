import { Divider, Menu } from "antd";
import Profile from "components/structure/Profile";
import userData from "db/user.json";
import { MenuProps } from "lib/menu";
import styled from "styled-components";

const Container = styled.div`
    padding: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

export default function Page() {
    const items = [];
    const onClick: MenuProps["onClick"] = e => {
        console.log("click ", e);
    };

    return (
        <Container>
            <Profile user={userData} />
            <Divider />
            <Menu
                items={items}
                mode="inline"
                style={{ width: 256 }}
                onClick={onClick}
            />
        </Container>
    );
}
