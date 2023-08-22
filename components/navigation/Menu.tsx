import { Divider, Menu } from "antd";
import Profile from "components/structure/Profile";
import { MenuProps } from "hooks/menu";
import useRooms from "hooks/menu/rooms";
import useNotice from "hooks/notice/notice";
import client from "lib/api";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    margin: ${({ theme: { SPACING } }) => SPACING.STANDARD};
    overflow: hidden;
`;

export default function Page() {
    const [user, setUser] = useState({ email: "" });
    const { errorHandler, contextHolder } = useNotice();
    const { rooms } = useRooms();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await client.get("users/1");
                setUser(data);
            } catch (e) {
                errorHandler(e);
            }
        })();
    }, []);

    const onClick: MenuProps["onClick"] = e => {
        console.log("click ", e);
    };

    return (
        <Container>
            {contextHolder}
            <Profile user={user} />
            <Divider />
            <Menu
                items={rooms}
                mode="inline"
                style={{ width: 256 }}
                onClick={onClick}
            />
        </Container>
    );
}
