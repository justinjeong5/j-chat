import { PlusOutlined } from "@ant-design/icons";
import DirectRooms from "@app/_component/menu/DirectRooms";
import JoinDirectRoomModal from "@app/_component/menu/JoinDirectRoomModal";
import JoinPublicRoomModal from "@app/_component/menu/JoinPublicRoomModal";
import PublicRooms from "@app/_component/menu/PublicRooms";
import Profile from "@app/_component/Profile";
import SiderFrame from "@app/_component/SiderFrame";
import useNotice from "@hooks/notice";
import { cn } from "@lib/utils";
import RoomModel from "@models/Room";
import RoomRepo from "@repos/Room";
import { joinRoom } from "@socket/room";
import { TDirectRoom, TPublicRoom, TRoom, TRoomId } from "@t/room.type";
import { TGeneralUser } from "@t/user.type";
import type { TourProps } from "antd";
import { Layout, Tour } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function Page({ user }) {
    const router = useRouter();
    const addPublicRoomBtnRef = useRef(null);
    const addDirectRoomBtnRef = useRef(null);

    const [publicRooms, setPublicRooms] = useState<TPublicRoom[]>([]);
    const [directRooms, setDirectRooms] = useState<TDirectRoom[]>([]);
    const [fetchingRooms, setFetchingRooms] = useState(false);
    const { errorHandler, contextHolder } = useNotice();
    const [showTour, setShowTour] = useState(false);

    const steps: TourProps["steps"] = useMemo(
        () => [
            {
                title: "환영합니다.",
                description: "다양한 사람과 재미있는 이야기를 나누어 보세요.",
                nextButtonProps: { className: cn("bg-[#1677FF]") },
                cover: (
                    <img
                        alt="tour.png"
                        src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                    />
                ),
            },
            {
                title: "대화방 들어가기",
                description: "대화방을 들어가서 대화를 나눠보세요.",
                nextButtonProps: { className: cn("bg-[#1677FF]") },
                target: () => addPublicRoomBtnRef.current,
            },
            {
                title: "DM으로 대화하기",
                description: "사람들과 1:1 대화를 나눠보세요.",
                nextButtonProps: { className: cn("bg-[#1677FF]") },
                target: () => addDirectRoomBtnRef.current,
            },
        ],
        [addPublicRoomBtnRef, addDirectRoomBtnRef],
    );

    const onJoinPublicRoom = useCallback(
        async (roomId: TRoomId) => {
            const room = await RoomRepo.joinRoom(roomId, user.id);
            setPublicRooms((prev: TPublicRoom[]): TPublicRoom[] => [
                ...prev,
                { ...room, unread: false } as TPublicRoom,
            ]);
            joinRoom(roomId, user.id);
            router.push(`/rooms/${roomId}`);
        },
        [user.id],
    );

    useEffect(() => {
        (async () => {
            try {
                setFetchingRooms(true);
                if (!user.id) {
                    return;
                }

                const roomsData = await RoomRepo.getRooms({
                    users: { $in: user.id },
                    type: RoomModel.PUBLIC,
                });
                setPublicRooms(
                    roomsData.results.map(
                        (rr: TRoom): TPublicRoom => ({
                            ...rr,
                            unread: false,
                        }),
                    ) as TPublicRoom[],
                );

                const directRoomsData = await RoomRepo.getRooms({
                    users: { $in: user.id },
                    type: RoomModel.DIRECT,
                });
                setDirectRooms(
                    directRoomsData.results.map(
                        (rr: TRoom): TDirectRoom => ({
                            ...rr.users.find(u => u.id !== user.id),
                            id: rr.id,
                            roomId: rr.id,
                            users: rr.users as TGeneralUser[],
                            active: false,
                            unread: false,
                        }),
                    ) as TDirectRoom[],
                );

                if (!roomsData?.results?.length) {
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
                <Layout
                    className={cn("relative", "block", "bg-[white]")}
                    hasSider
                >
                    <PublicRooms loading={fetchingRooms} rooms={publicRooms}>
                        <JoinPublicRoomModal
                            user={user}
                            onJoinRoom={onJoinPublicRoom}
                            onCreateRoom={r => setPublicRooms(rs => [...rs, r])}
                        >
                            <div
                                ref={addPublicRoomBtnRef}
                                className={cn("flex", "items-center", "gap-2")}
                            >
                                <PlusOutlined /> 대화방 입장
                            </div>
                        </JoinPublicRoomModal>
                    </PublicRooms>
                    <DirectRooms loading={fetchingRooms} rooms={directRooms}>
                        <JoinDirectRoomModal
                            user={user}
                            rooms={directRooms}
                            onCreateRoom={r => setDirectRooms(rs => [...rs, r])}
                        >
                            <div
                                ref={addDirectRoomBtnRef}
                                className={cn("flex", "items-center", "gap-2")}
                            >
                                <PlusOutlined /> DM 시작
                            </div>
                        </JoinDirectRoomModal>
                    </DirectRooms>
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
