import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Modal } from "antd";
// import useNotice from "hooks/notice/notice";
import { useState } from "react";

export default function JoinRoomModal({ children }) {
    // const { errorHandler, contextHolder } = useNotice();

    const [open, setOpen] = useState(false);
    const toggleModal = () => {
        setOpen(!open);
    };
    const data = [
        {
            title: "Ant Design Title 1",
        },
        {
            title: "Ant Design Title 2",
        },
        {
            title: "Ant Design Title 3",
        },
        {
            title: "Ant Design Title 4",
        },
    ];

    return (
        <>
            {/* {contextHolder} */}
            <Button block type="text" onClick={toggleModal}>
                {children}
            </Button>
            <Modal title="대화방 목록" open={open} onCancel={toggleModal}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
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
                                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                                        <Avatar
                                            style={{
                                                backgroundColor: "#f56a00",
                                            }}
                                        >
                                            K
                                        </Avatar>
                                        <Avatar
                                            style={{
                                                backgroundColor: "#87d068",
                                            }}
                                            icon={<UserOutlined />}
                                        />
                                        <Avatar
                                            style={{
                                                backgroundColor: "#1677ff",
                                            }}
                                            icon={<AntDesignOutlined />}
                                        />
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
            </Modal>
        </>
    );
}
