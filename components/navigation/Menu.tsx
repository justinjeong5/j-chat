import { Divider, Layout, Menu } from "antd";
import Profile from "components/structure/Profile";
import { MenuProps } from "hooks/menu";
import useRooms from "hooks/menu/rooms";
import useNotice from "hooks/notice/notice";
import client from "lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    margin: ${({ theme: { SPACING } }) => SPACING.STANDARD};
    overflow: hidden;
`;

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", email: "" });
    const [rooms, setRooms] = useState([]);
    const { errorHandler, contextHolder } = useNotice();

    useEffect(() => {
        (async () => {
            try {
                const { rooms: roomsData } = await useRooms();
                setRooms(roomsData);
            } catch (e) {
                errorHandler(e);
            }
        })();
    }, []);

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
        router.push(`/rooms/${e.key}`);
    };

    return (
        <Container>
            {contextHolder}
            <Profile user={user} />
            <Divider />
            <Layout hasSider>
                <Menu items={rooms} mode="inline" onClick={onClick} />
            </Layout>
        </Container>
    );
}
