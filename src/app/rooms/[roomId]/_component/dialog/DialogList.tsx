import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import DialogItem from "@app/rooms/[roomId]/_component/dialog/DialogItem";
import useMobile from "@hooks/layout/device";
import { cn } from "@lib/utils";
import { TCommon } from "@t/common.type";
import IMessage from "@t/message.type";
import { Avatar, List, Space } from "antd";
import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

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

export default function DialogList({ dialog }: { dialog: Array<IMessage> }) {
    const dialogFocus = useRef<HTMLInputElement>(null);
    const isMobile = useMobile();

    useEffect(() => {
        dialogFocus.current?.scrollIntoView({ behavior: "instant" });
    }, [dialog]);

    const getDate = (date: Date): string => {
        return new Date(date).toLocaleString();
    };

    return (
        <div
            className={cn(
                "flex",
                "flex-col",
                "divide-y-2",
                "divide-solid",
                "divide-slate-100",
            )}
        >
            {dialog.map(item => (
                <DialogItem
                    key={uuidv4()}
                    type={item.type}
                    content={item.content}
                    writer={item.writer}
                    createdAt={item.createdAt}
                />
            ))}
            <div ref={dialogFocus} />
        </div>
    );
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={dialog}
                renderItem={(item: IMessage) => {
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
