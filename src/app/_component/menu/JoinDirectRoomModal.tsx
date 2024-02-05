import useNotice from "@hooks/notice/notice";
import getDirectRoomId from "@lib/string/getDirectRoomId";
import { cn } from "@lib/utils";
import RoomModel from "@models/Room";
import RoomRepo from "@repos/Room";
import UserRepo from "@repos/User";
import { TGeneralUser } from "@t/user.type";
import { Avatar, Button, Divider, List, Modal, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function JoinDirectRoomModal({
    user,
    rooms,
    onCreateRoom,
    children,
}) {
    const { errorHandler, contextHolder } = useNotice();
    const router = useRouter();

    const [page, setPage] = useState(0);
    const [directRooms, setDirectRooms] = useState([] as TGeneralUser[]);
    const [open, setOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchDirectRooms = async () => {
        try {
            const { results: roomsData, hasMore: more } =
                await UserRepo.getUsers({
                    page,
                    id: { $ne: user.id },
                    type: RoomModel.DIRECT,
                });

            // DM 찾는 로직은 서버에 별도의 API를 두는 것이 좋을 것 같다.
            setDirectRooms((r: TGeneralUser[]): TGeneralUser[] => [
                ...r,
                ...roomsData.filter(u =>
                    rooms.every(
                        (rr: { users: { id: string }[] }) =>
                            !rr.users.some(({ id }) => id === (u.id as string)),
                    ),
                ),
            ]);
            setPage(p => p + 1);
            setHasMore(more);
        } catch (e) {
            errorHandler(e);
        }
    };

    const handleOpenModal = () => {
        fetchDirectRooms();
        setOpen(true);
    };

    const handleCreateRoom = async otherUser => {
        try {
            const room = await RoomRepo.createRoom({
                id: getDirectRoomId(otherUser.id, user.id),
                title: `${otherUser.username} & ${user.username}`,
                description: `${otherUser.username}님과 ${user.username} 님의 DM`,
                type: RoomModel.DIRECT,
                users: [otherUser.id, user.id],
            });
            onCreateRoom(room);

            setDirectRooms([]);
            setPage(0);
            setHasMore(true);
            setOpen(false);
        } catch (e) {
            errorHandler(e);
        }
    };

    const handleRoute = (userId: string) => {
        router.push(`/rooms/${getDirectRoomId(userId, user.id)}`);
    };

    return (
        <>
            {contextHolder}
            <Button
                block
                type="text"
                className={cn("flex", "px-6", "cursor-pointer")}
                onClick={handleOpenModal}
            >
                {children}
            </Button>
            <Modal
                title="대화 참여하기"
                open={open}
                // okText 제거하기
                cancelText="취소"
                onCancel={() => setOpen(false)}
            >
                <div
                    id="scrollableDiv"
                    style={{ height: "50vh", overflow: "auto" }}
                >
                    <InfiniteScroll
                        dataLength={directRooms.length}
                        next={fetchDirectRooms}
                        hasMore={hasMore}
                        loader={
                            <Skeleton avatar paragraph={{ rows: 1 }} active />
                        }
                        endMessage={
                            <Divider plain>
                                더 이상 불러올 목록이 없습니다. 🤐
                            </Divider>
                        }
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={directRooms}
                            renderItem={(u: TGeneralUser) => (
                                <List.Item onClick={() => handleCreateRoom(u)}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar.Group
                                                maxCount={2}
                                                size="large"
                                                maxStyle={{
                                                    color: "#f56a00",
                                                    backgroundColor: "#fde3cf",
                                                }}
                                            >
                                                <Avatar
                                                    key={u.id}
                                                    src={u.avatar}
                                                />
                                            </Avatar.Group>
                                        }
                                        title={
                                            <div
                                                role="presentation"
                                                onClick={() =>
                                                    handleRoute(u.id as string)
                                                }
                                            >
                                                {u.username}
                                            </div>
                                        }
                                        description={u.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </Modal>
        </>
    );
}
