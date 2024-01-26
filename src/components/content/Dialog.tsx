import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import useMobile from "@hooks/layout/device";
import { cn } from "@lib/utils";
import { TCommon } from "@t/common.type";
import IMessage from "@t/message.type";
import { Avatar, Empty, List, Skeleton, Space } from "antd";
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
    const SKELETON_COUNT = 5;

    const getDate = (date: Date): string => {
        return new Date(date).toLocaleString();
    };

    useEffect(() => {
        if (autoFocus) {
            dialogFocus.current?.scrollIntoView({ behavior: "instant" });
        }
    }, [dialog]);

    if (true) {
        return (
            <>
                {Array.from({ length: SKELETON_COUNT }).map(() => (
                    <div
                        className={cn("flex", "gap-4", "w-full", "mt-8")}
                        key={uuidv4()}
                    >
                        <div className={cn("flex", "gap-4")}>
                            <div
                                className={cn(
                                    "w-10",
                                    "h-10",
                                    "rounded-full",
                                    "bg-gradient-120",
                                    "bg-gradient-to-r",
                                    "from-[#dfdede]",
                                    "via-[#F0F0F0]",
                                    "to-[#dfdede]",
                                    "bg-[100%_0]",
                                    "bg-[length:200%]",
                                    "animate-load",
                                )}
                            />
                            <div>
                                <Skeleton active avatar />
                                <Space className={cn("mt-5", "ml-[56px]")}>
                                    <Skeleton.Button active size="small" />
                                    <Skeleton.Button active size="small" />
                                    <Skeleton.Button active size="small" />
                                </Space>
                            </div>
                            <Skeleton.Image active />
                        </div>
                    </div>
                ))}
            </>
        );
    }

    if (!dialog.length) {
        return (
            <div
                className={cn(
                    "flex",
                    "justify-center",
                    "items-center",
                    "h-[calc(100vh-364px)]",
                )}
            >
                <Empty description="No dialog" />
            </div>
        );
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
