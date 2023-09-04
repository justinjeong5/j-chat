import {
    CoffeeOutlined,
    PlusOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import MenuFrame from "components/layout/SiderFrame";
import CreateRoomModal from "components/sider/CreateRoomModal";
import Profile from "components/sider/Profile";
import Rooms from "components/sider/Rooms";
import useNotice from "hooks/notice/notice";
import useRooms from "hooks/room/rooms";
import client from "lib/api";
import delay from "lib/time/delay";
import RoomsModel from "models/Rooms";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MenuWrapper = styled(Layout)`
    display: block;
    background: white;
`;

export default function Page() {
    const { getRooms } = useRooms();
    const [user, setUser] = useState({ name: "", email: "" });
    const [rooms, setRooms] = useState([]);
    const [fetchingRooms, setFetchingRooms] = useState(false);
    const { errorHandler, contextHolder } = useNotice();

    useEffect(() => {
        (async () => {
            try {
                setFetchingRooms(true);
                const [roomsData] = await Promise.all([
                    getRooms(),
                    delay(2000),
                ]);

                setRooms([
                    {
                        key: RoomsModel.PUBLIC,
                        label: "Public Rooms",
                        icon: <CoffeeOutlined />,
                        children: roomsData
                            .getTypeOf(RoomsModel.PUBLIC)
                            .map(r => r.toMenu()),
                    },
                    {
                        key: RoomsModel.STAR,
                        label: "Starred Rooms",
                        icon: <PushpinOutlined />,
                        children: roomsData
                            .getTypeOf(RoomsModel.STAR)
                            .map(r => r.toMenu()),
                    },
                    {
                        key: RoomsModel.DIRECT,
                        label: "Direct Messages",
                        icon: <UserOutlined />,
                        children: roomsData
                            .getTypeOf(RoomsModel.DIRECT)
                            .map(r => r.toMenu()),
                    },
                ]);
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

    const onCreateRoom = room => {
        console.log(room.toMenu());
        setRooms(
            rooms.map(r => {
                if (r.key === room.type) {
                    return {
                        ...r,
                        children: [...r.children, room.toMenu()],
                    };
                }
                return { ...r };
            }),
        );
    };

    return (
        <>
            {contextHolder}
            <MenuFrame
                profile={<Profile user={user} />}
                footer={<div>J-Chat v1.0.0</div>}
            >
                <MenuWrapper hasSider>
                    <CreateRoomModal onCreateRoom={onCreateRoom}>
                        <PlusOutlined /> Add Room
                    </CreateRoomModal>
                    <Rooms loading={fetchingRooms} rooms={rooms} />
                </MenuWrapper>
            </MenuFrame>
        </>
    );
}
