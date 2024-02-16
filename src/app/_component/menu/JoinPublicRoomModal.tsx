import { TeamOutlined } from "@ant-design/icons";
import useNotice from "@hooks/notice";
import { cn } from "@lib/utils";
import RoomModel from "@models/Room";
import RoomRepo from "@repos/Room";
import { TPublicRoom, TRoomId } from "@t/room.type";
import { TGeneralUser } from "@t/user.type";
import {
    Avatar,
    Button,
    Divider,
    Form,
    Input,
    List,
    Modal,
    Skeleton,
} from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export default function JoinPublicRoomModal({
    user,
    onJoinRoom,
    onCreateRoom,
    children,
}: {
    user: TGeneralUser;
    onJoinRoom: (roomId: TRoomId) => void;
    onCreateRoom: (room: TPublicRoom) => void;
    children: React.ReactNode;
}) {
    const { errorHandler, contextHolder } = useNotice();
    const router = useRouter();
    const [form] = Form.useForm();

    const [rooms, setRooms] = useState([] as TPublicRoom[]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchRooms = useCallback(async () => {
        try {
            const { results: roomsData, hasMore: more } =
                await RoomRepo.getRooms({
                    page,
                    users: { $ne: user.id },
                    type: RoomModel.PUBLIC,
                });
            setRooms((r: TPublicRoom[]): TPublicRoom[] => [
                ...r,
                ...roomsData.map(rr => ({ ...rr, unread: false })),
            ]);
            setPage(p => p + 1);
            setHasMore(more);
        } catch (e) {
            errorHandler(e);
        }
    }, [user.id, page]);

    const handleCreateRoom = useCallback(async () => {
        const data = form.getFieldsValue();
        try {
            const room = await RoomRepo.createRoom({
                title: data.title,
                description: data.description,
                type: "public",
            });
            onCreateRoom({ ...room, unread: false });
            setOpen(false);
        } catch (e) {
            errorHandler(e);
        }
    }, [onCreateRoom]);

    const handleOpenModal = useCallback(() => {
        fetchRooms();
        setOpen(true);
    }, [fetchRooms]);

    const handleJoinRoom = useCallback(
        (roomId: TRoomId) => {
            onJoinRoom(roomId);
            setRooms([]);
            setPage(0);
            setHasMore(true);
            setOpen(false);
        },
        [onJoinRoom],
    );

    const handleRoute = useCallback((roomId: TRoomId) => {
        router.push(`/rooms/${roomId}`);
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
                okText="대화방 생성"
                cancelText="취소"
                onOk={handleCreateRoom}
                onCancel={() => setOpen(false)}
            >
                <div>대화방 생성</div>
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={handleCreateRoom}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        name="title"
                        label="대화방 이름"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="설명"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <div>대화방 목록</div>
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
                            renderItem={(item: TPublicRoom) => (
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
                                                                key={u.id}
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
                                            <div
                                                role="presentation"
                                                onClick={() =>
                                                    handleRoute(item.id)
                                                }
                                            >
                                                {item.title}
                                            </div>
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
