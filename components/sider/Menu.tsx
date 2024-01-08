/* eslint-disable no-underscore-dangle */
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import SiderFrame from "@components/layout/SiderFrame";
import CreateRoomModal from "@components/sider/CreateRoomModal";
import JoinRoomModal from "@components/sider/JoinRoomModal";
import Profile from "@components/sider/Profile";
import Rooms from "@components/sider/Rooms";
import useNotice from "@hooks/notice/notice";
import cn from "@lib/string/className";
import RoomRepo from "@repos/Room";
import { joinRoom } from "@socket/room";
import IRoom from "@t/room.type";
import type { TourProps } from "antd";
import { Layout, Tour } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page({ user }) {
    const router = useRouter();
    const addRoomBtnRef = useRef(null);
    const joinRoomBtnRef = useRef(null);

    const [rooms, setRooms] = useState<IRoom[]>(null);
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
        {
            title: "대화방 들어가기",
            description: "대화방에 들어가서 대화를 나눠보세요.",
            target: () => joinRoomBtnRef.current,
        },
    ];

    const onJoinRoom = async (roomId: string) => {
        const room = await RoomRepo.joinRoom(roomId, user.id);
        setRooms(r => [...r, room]);
        router.push(`/rooms/${roomId}`);
        joinRoom(roomId, user.id);
    };

    const fetchRooms = async () => {
        setFetchingRooms(true);
        const { results: roomsData } = await RoomRepo.getRooms({
            users: user.id,
        });
        setRooms(roomsData);
        setFetchingRooms(false);
    };

    useEffect(() => {
        (async () => {
            try {
                setFetchingRooms(true);
                if (!user.id) {
                    return;
                }
                await fetchRooms();
                if (rooms && !rooms.length) {
                    setShowTour(true);
                }
            } catch (e) {
                errorHandler(e);
            } finally {
                setFetchingRooms(false);
            }
        })();
    }, [user.id]);

    return (
        <>
            {contextHolder}
            <SiderFrame
                profile={<Profile user={user} />}
                footer={<div>J-Chat v1.0.0</div>}
            >
                <Layout className={cn("block", "bg-[white]")} hasSider>
                    <CreateRoomModal onCreateRoom={fetchRooms}>
                        <div ref={addRoomBtnRef}>
                            <PlusOutlined /> 대화방 생성
                        </div>
                    </CreateRoomModal>
                    <JoinRoomModal user={user} onJoinRoom={onJoinRoom}>
                        <div ref={joinRoomBtnRef}>
                            <UnorderedListOutlined /> 대화방 입장
                        </div>
                    </JoinRoomModal>
                    <Rooms loading={fetchingRooms} rooms={rooms} />
                </Layout>
            </SiderFrame>
            <Tour
                open={showTour}
                onClose={() => setShowTour(false)}
                steps={steps}
            />
        </>
    );
}
