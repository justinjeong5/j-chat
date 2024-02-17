import useNotice from "@hooks/notice";
import combineDirectRoomId from "@lib/string/combine-direct-room-id";
import { cn } from "@lib/utils";
import RoomModel from "@models/Room";
import RoomRepo from "@repos/Room";
import UserRepo from "@repos/User";
import { TDirectRoom } from "@t/room.type";
import { TGeneralUser, TUser, TUserId } from "@t/user.type";
import { Avatar, Button, Divider, List, Modal, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function JoinDirectRoomModal({
    user,
    rooms,
    onCreateRoom,
    children,
}: {
    user: TUser;
    rooms: TDirectRoom[];
    onCreateRoom: (room: TDirectRoom) => void;
    children: React.ReactNode;
}) {
    const { errorHandler, contextHolder } = useNotice();
    const router = useRouter();

    const [page, setPage] = useState(0);
    const [users, setUsers] = useState([] as TGeneralUser[]);
    const [open, setOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchDirectRooms = useCallback(async () => {
        try {
            const { results: roomsData, hasMore: more } =
                await UserRepo.getUsers({
                    page,
                    id: { $ne: user.id },
                    type: RoomModel.DIRECT,
                });

            // DM 찾는 로직은 서버에 별도의 API를 두는 것이 좋을 것 같다.
            setUsers((r: TGeneralUser[]): TGeneralUser[] => [
                ...r,
                ...roomsData.filter(u =>
                    rooms.every(
                        (rr: { users: TGeneralUser[] }) =>
                            !rr.users.some(({ id }) => id === u.id),
                    ),
                ),
            ]);
            setPage(p => p + 1);
            setHasMore(more);
        } catch (e) {
            errorHandler(e);
        }
    }, [user.id, rooms, page]);

    const handleCreateRoom = useCallback(
        async (otherUser: TGeneralUser) => {
            try {
                const room = await RoomRepo.createRoom({
                    id: combineDirectRoomId(
                        otherUser.id as TUserId,
                        user.id as TUserId,
                    ),
                    title: `${otherUser.username} & ${user.username}`,
                    description: `${otherUser.username}님과 ${user.username} 님의 DM`,
                    type: RoomModel.DIRECT,
                    users: [otherUser.id, user.id],
                });
                onCreateRoom({
                    ...room,
                    username: otherUser.username,
                    roomId: room.id,
                    users: room.users as TGeneralUser[],
                    active: false,
                    unread: false,
                } as TDirectRoom);

                setUsers([]);
                setPage(0);
                setHasMore(true);
                setOpen(false);
            } catch (e) {
                errorHandler(e);
            }
        },
        [user.id, user.username, onCreateRoom],
    );

    const handleRoute = useCallback(
        (userId: TUserId) => {
            router.push(
                `/rooms/${combineDirectRoomId(userId, user.id as TUserId)}`,
            );
        },
        [user.id],
    );

    const handleOpenModal = useCallback(() => {
        fetchDirectRooms();
        setOpen(true);
    }, []);

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
                        dataLength={users.length}
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
                            dataSource={users}
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
                                                    handleRoute(u.id as TUserId)
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
