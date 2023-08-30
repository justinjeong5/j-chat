import { Layout, Menu } from "antd";
import MenuFrame from "components/layout/MenuFrame";
import Profile from "components/structure/Profile";
import { MenuProps } from "hooks/menu";
import useRooms from "hooks/menu/rooms";
import useNotice from "hooks/notice/notice";
import client from "lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
        <>
            {contextHolder}
            <MenuFrame
                profile={<Profile user={user} />}
                footer={<div>J-Chat v1.0.0</div>}
            >
                <Layout hasSider>
                    <Menu items={rooms} mode="inline" onClick={onClick} />
                </Layout>
            </MenuFrame>
        </>
    );
}
