import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import DialogEmpty from "@app/rooms/[roomId]/_component/DialogEmpty";
import DialogSkeleton from "@app/rooms/[roomId]/_component/DialogSkeleton";
import useMobile from "@hooks/layout/device";
import { cn } from "@lib/utils";
import { TCommon } from "@t/common.type";
import IMessage from "@t/message.type";
import { Avatar, List, Space } from "antd";
import React, { useEffect, useRef } from "react";

const ActionItems = (item: {
    stars: Array<TCommon>;
    likes: Array<TCommon>;
    comments: Array<TCommon>;
}) => {
    return [
        <Space>
            <StarOutlined />
            {item.stars.length}
        </Space>,
        <Space>
            <LikeOutlined />
            {item.likes.length}
        </Space>,
        <Space>
            <MessageOutlined />
            {item.comments.length}
        </Space>,
    ];
};

export default function Dialog({
    dialog = [],
    loading = false,
    autoFocus = false,
}: {
    dialog?: Array<IMessage>;
    loading?: boolean;
    autoFocus?: boolean;
}) {
    const dialogFocus = useRef<HTMLInputElement>(null);

    const isMobile = useMobile();

    const getDate = (date: Date): string => {
        return new Date(date).toLocaleString();
    };

    useEffect(() => {
        if (autoFocus) {
            dialogFocus.current?.scrollIntoView({ behavior: "instant" });
        }
    }, [dialog]);

    if (loading) {
        return <DialogSkeleton />;
    }

    if (!dialog.length) {
        return <DialogEmpty />;
    }

    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={dialog}
                renderItem={(item: IMessage) => {
                    if (item.type === "joinRoom") {
                        return (
                            <List.Item key={item.id}>
                                <div className={cn("mt-4")}>
                                    {item.writer?.username} 님께서 입장했습니다.
                                </div>
                            </List.Item>
                        );
                    }
                    if (item.type === "leaveRoom") {
                        return (
                            <List.Item key={item.id}>
                                <div className={cn("mt-4")}>
                                    {item.writer?.username} 님께서 퇴장했습니다.
                                </div>
                            </List.Item>
                        );
                    }
                    return (
                        <List.Item
                            key={item.id}
                            actions={ActionItems(item)}
                            extra={
                                !isMobile &&
                                item.image && (
                                    <img
                                        style={{ maxWidth: "24vw" }}
                                        width="272px"
                                        alt="userImage"
                                        src={item.image}
                                    />
                                )
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.writer?.avatar} />}
                                title={item.writer?.username}
                                description={
                                    <div>{getDate(item.createdAt)}</div>
                                }
                            />
                            {isMobile && item.image && (
                                <img
                                    style={{ maxWidth: "24vw" }}
                                    width="272px"
                                    alt="userImage"
                                    src={item.image}
                                />
                            )}
                            <div className={cn("mt-4")}>{item.content}</div>
                        </List.Item>
                    );
                }}
            />
            <div ref={dialogFocus} />
        </>
    );
}
