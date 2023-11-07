import { TeamOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, List, Modal, Skeleton } from "antd";
import useNotice from "hooks/notice/notice";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RoomRepo from "repos/Room";

export default function JoinRoomModal({ user, onJoinRoom, children }) {
    const { errorHandler, contextHolder } = useNotice();

    const [page, setPage] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [open, setOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchRooms = async () => {
        try {
            const { results: roomsData, hasMore: more } =
                await RoomRepo.getRooms({
                    page,
                    users: { $ne: user.id },
                });
            setRooms(r => [...r, ...roomsData]);
            setPage(p => p + 1);
            setHasMore(more);
        } catch (e) {
            errorHandler(e);
        }
    };

    const handleOpenModal = () => {
        fetchRooms();
        setOpen(true);
    };

    const handleJoinRoom = (roomId: string) => {
        onJoinRoom(roomId);
        setRooms([]);
        setPage(0);
        setHasMore(true);
        setOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Button block type="text" onClick={handleOpenModal}>
                {children}
            </Button>
            <Modal
                title="대화방 목록"
                open={open}
                onCancel={() => setOpen(false)}
            >
                <div
                    id="scrollableDiv"
                    style={{ height: "50vh", overflow: "auto" }}
                >
                    <InfiniteScroll
                        dataLength={rooms.length}
                        next={fetchRooms}
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
                            dataSource={rooms}
                            renderItem={item => (
                                <List.Item
                                    onClick={() => handleJoinRoom(item.id)}
                                >
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
                                                {item.users.length ? (
                                                    item.users.map(u => {
                                                        return (
                                                            <Avatar
                                                                src={u.avatar}
                                                            />
                                                        );
                                                    })
                                                ) : (
                                                    <Avatar
                                                        icon={<TeamOutlined />}
                                                        style={{
                                                            backgroundColor:
                                                                "#f56a00",
                                                        }}
                                                    >
                                                        N/A
                                                    </Avatar>
                                                )}
                                            </Avatar.Group>
                                        }
                                        title={
                                            <a href="https://ant.design">
                                                {item.title}
                                            </a>
                                        }
                                        description={item.description}
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