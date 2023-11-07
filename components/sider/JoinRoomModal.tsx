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
            const roomsData = await RoomRepo.getRooms({
                page,
                users: { $ne: user.id },
            });
            if (!roomsData.length) {
                setHasMore(false);
                return;
            }
            setRooms(r => [...r, ...roomsData]);
            setPage(p => p + 1);
        } catch (e) {
            errorHandler(e);
        }
    };

    const toggleModal = () => {
        setOpen(!open);
    };

    const handleOpenModal = () => {
        fetchRooms();
        toggleModal();
    };

    const handleJoinRoom = (roomId: string) => {
        onJoinRoom(roomId);
        toggleModal();
    };

    return (
        <>
            {contextHolder}
            <Button block type="text" onClick={handleOpenModal}>
                {children}
            </Button>
            <Modal title="대화방 목록" open={open} onCancel={toggleModal}>
                <InfiniteScroll
                    dataLength={rooms.length}
                    next={fetchRooms}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
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
                            <List.Item onClick={() => handleJoinRoom(item.id)}>
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
            </Modal>
        </>
    );
}
