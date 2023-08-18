import { Divider, Menu } from "antd";
import Profile from "components/structure/Profile";
import client from "lib/api";
import { MenuProps } from "lib/menu";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

export default function Page() {
    const [user, setUser] = useState({ email: "" });
    useEffect(() => {
        (async () => {
            try {
                const userData = await client.get("users/1");
                console.log(userData);
                console.log("=====");
                console.log(userData.data);
                setUser(userData.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const items = [];
    const onClick: MenuProps["onClick"] = e => {
        console.log("click ", e);
    };

    return (
        <Container>
            <Profile user={user} />
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
