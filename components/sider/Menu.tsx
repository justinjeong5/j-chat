import {
    CoffeeOutlined,
    PlusOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import MenuFrame from "components/layout/SiderFrame";
import Profile from "components/sider/Profile";
import Rooms from "components/sider/Rooms";
import useNotice from "hooks/notice/notice";
import useRooms from "hooks/room/rooms";
import client from "lib/api";
import delay from "lib/time/delay";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MenuWrapper = styled(Layout)`
    display: block;
    background: white;
`;

export default function Page() {
    const [user, setUser] = useState({ name: "", email: "" });
    const [rooms, setRooms] = useState({ public: {}, star: {}, direct: {} });
    const [fetchingRooms, setFetchingRooms] = useState(false);
    const { errorHandler, contextHolder } = useNotice();

    useEffect(() => {
        (async () => {
            try {
                setFetchingRooms(true);
                const [roomsData] = await Promise.all([
                    useRooms(),
                    delay(2000),
                ]);

                // rooms를 추가로 가공하지 않고 바로 사용가능하도록 가공하기
                setRooms({
                    public: {
                        key: "public",
                        label: "Public Rooms",
                        icon: <CoffeeOutlined />,
                        children: roomsData.rooms.filter(
                            ({ type }) => type === "public",
                        ),
                    },
                    star: {
                        key: "star",
                        label: "Starred Rooms",
                        icon: <PushpinOutlined />,
                        children: roomsData.rooms.filter(
                            ({ type }) => type === "star",
                        ),
                    },
                    direct: {
                        key: "direct",
                        label: "Direct Messages",
                        icon: <UserOutlined />,
                        children: roomsData.rooms.filter(
                            ({ type }) => type === "direct",
                        ),
                    },
                });
            } catch (e) {
                errorHandler(e);
            } finally {
                setFetchingRooms(false);
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

    const handleClickAdd = e => {
        console.log("handleClickAdd", e);
    };

    return (
        <>
            {contextHolder}
            <MenuFrame
                profile={<Profile user={user} />}
                footer={<div>J-Chat v1.0.0</div>}
            >
                <MenuWrapper hasSider>
                    <Button block type="text" onClick={handleClickAdd}>
                        <PlusOutlined /> Add Room
                    </Button>
                    <Rooms loading={fetchingRooms} rooms={rooms} />
                    {/* rooms를 추가로 가공하지 않고 바로 사용가능하도록 전달하기 */}
                </MenuWrapper>
            </MenuFrame>
        </>
    );
}
