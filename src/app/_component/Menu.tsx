/* eslint-disable no-underscore-dangle */
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import CreateRoomModal from "@app/_component/menu/CreateRoomModal";
import JoinRoomModal from "@app/_component/menu/JoinRoomModal";
import Profile from "@app/_component/menu/Profile";
import Rooms from "@app/_component/menu/PublicRooms";
import SiderFrame from "@app/_component/SiderFrame";
import useNotice from "@hooks/notice/notice";
import { cn } from "@lib/utils";
import RoomRepo from "@repos/Room";
import UserRepo from "@repos/User";
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

    const [rooms, setRooms] = useState<IRoom[]>([]);
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
        const { results: roomsData } = await RoomRepo.getRooms({
            users: user.id,
        });
        return roomsData;
    };

    useEffect(() => {
        (async () => {
            try {
                setFetchingRooms(true);
                if (!user.id) {
                    return;
                }
                const roomsData = await fetchRooms();
                setRooms(roomsData);

                if (roomsData && !roomsData.length) {
                    setShowTour(true);
                }
            } catch (e) {
                errorHandler(e);
            } finally {
                setFetchingRooms(false);
            }
        })();
    }, [user.id]);

    useEffect(() => {
        (async () => {
            try {
                const t = await UserRepo.getUsers();
                console.log(t);
            } catch (e) {
                errorHandler(e);
            }
        })();
    }, []);

    return (
        <>
            {contextHolder}
            <SiderFrame
                profile={<Profile user={user} />}
                footer={<div>J-Chat v1.0.0</div>}
            >
                <Layout className={cn("block", "bg-[white]")} hasSider>
                    <CreateRoomModal
                        onCreateRoom={r => setRooms(rs => [...rs, r])}
                    >
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
