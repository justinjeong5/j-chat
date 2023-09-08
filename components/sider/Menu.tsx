import {
    CoffeeOutlined,
    PlusOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { TourProps } from "antd";
import { Layout, Tour } from "antd";
import MenuFrame from "components/layout/SiderFrame";
import CreateRoomModal from "components/sider/CreateRoomModal";
import Profile from "components/sider/Profile";
import Rooms from "components/sider/Rooms";
import useNotice from "hooks/notice/notice";
import client from "lib/api";
import RoomsModel from "models/Rooms";
import { useEffect, useRef, useState } from "react";
import RoomRepo from "repos/Room";
import styled from "styled-components";

const MenuWrapper = styled(Layout)`
    display: block;
    background: white;
`;

export default function Page() {
    const addRoomBtnRef = useRef(null);

    const [user, setUser] = useState({ name: "", email: "" });
    const [rooms, setRooms] = useState([]);
    const [fetchingRooms, setFetchingRooms] = useState(false);
    const { errorHandler, contextHolder } = useNotice();
    const [showTour, setShowTour] = useState(false);

    const steps: TourProps["steps"] = [
        {
            title: "환영합니다.",
            description: "다양한 사람과 재미있는 이야기를 나누어 보세요.",
            cover: (
                <img
                    alt="tour.png"
                    src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                />
            ),
        },
        {
            title: "대화방 생성",
            description: "대화방을 만들고 사람들을 초대해보세요.",
            target: () => addRoomBtnRef.current,
        },
    ];

    useEffect(() => {
        (async () => {
            try {
                setFetchingRooms(true);
                const roomsData = await RoomRepo.getRooms();
                if (roomsData.isEmpty()) {
                    setShowTour(true);
                }

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
                        label: "Direct Dialog",
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
                        <div ref={addRoomBtnRef}>
                            <PlusOutlined /> Add Room
                        </div>
                    </CreateRoomModal>
                    <Rooms loading={fetchingRooms} rooms={rooms} />
                </MenuWrapper>
            </MenuFrame>
            <Tour
                open={showTour}
                onClose={() => setShowTour(false)}
                steps={steps}
            />
        </>
    );
}
