import { TeamOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, List, Modal, Skeleton } from "antd";
import useNotice from "hooks/notice/notice";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RoomRepo from "repos/Room";

export default function JoinRoomModal({ onJoinRoom, children }) {
    const { errorHandler, contextHolder } = useNotice();

    const [page, setPage] = useState(1);
    const [rooms, setRooms] = useState([]);
    const [open, setOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const toggleModal = () => {
        setOpen(!open);
    };

    const handleJoinRoom = (roomId: string) => {
        onJoinRoom(roomId);
        toggleModal();
    };

    const fetchRooms = async () => {
        try {
            const roomsData = await RoomRepo.getRooms({ page });
            if (!roomsData.list.length) {
                setHasMore(false);
                return;
            }
            setRooms(r => [...r, ...roomsData.list]);
            setPage(p => p + 1);
        } catch (e) {
            errorHandler(e);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <>
            {contextHolder}
            <Button block type="text" onClick={toggleModal}>
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
                                                item.users.map(user => {
                                                    return (
                                                        <Avatar
                                                            src={user.avatar}
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
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </Modal>
        </>
    );
}
