import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import readableElapsedTime from "@lib/time/readable-elapsed-time";
import { cn } from "@lib/utils";
import type { FixMe } from "@t/common.type";
import type { TMessageType } from "@t/message.type";
import type { TUser } from "@t/user.type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ItemLayout({ children }) {
    return (
        <div
            className={cn("flex", "flex-col", "gap-4", "py-4", "pl-2", "pr-6")}
        >
            {children}
        </div>
    );
}

export default function DialogItem({
    type,
    content,
    stars,
    likes,
    comments,
    writer,
    createdAt,
}: {
    type: TMessageType;
    content: string;
    stars: Array<FixMe>;
    likes: Array<FixMe>;
    comments: Array<FixMe>;
    writer: TUser;
    createdAt: Date;
}) {
    const [elapsedTime, setElapsedTime] = useState("조금 전");

    useEffect(() => {
        setElapsedTime(readableElapsedTime(createdAt));
        const timer = setInterval(() => {
            const newElapsedTime = readableElapsedTime(createdAt);
            if (newElapsedTime !== elapsedTime) {
                setElapsedTime(newElapsedTime);
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [createdAt]);

    if (["joinRoom", "leaveRoom"].includes(type)) {
        return (
            <ItemLayout>
                <div className={cn("py-4")}>
                    <div className={cn("opacity-50")}>{elapsedTime}</div>
                    <div>{`${writer.username}님이 ${
                        type === "joinRoom" ? "입장" : "퇴장"
                    }하셨습니다. `}</div>
                </div>
            </ItemLayout>
        );
    }

    return (
        <ItemLayout>
            <div className={cn("flex", "gap-3", "items-center")}>
                <Image
                    className={cn("w-8", "h-8", "rounded-full")}
                    src={writer.avatar || ""}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    blurDataURL={writer.avatar}
                    placeholder="blur"
                />
                <div className={cn("w-full")}>
                    <div className={cn("flex", "justify-between")}>
                        <div>
                            <div>{writer.username}</div>
                            <div className={cn("opacity-50")}>
                                {elapsedTime}
                            </div>
                        </div>
                        <div className={cn("flex", "gap-3", "items-center")}>
                            {[
                                {
                                    icon: <StarOutlined />,
                                    count: stars.length,
                                },
                                {
                                    icon: <LikeOutlined />,
                                    count: likes.length,
                                },
                                {
                                    icon: <MessageOutlined />,
                                    count: comments.length,
                                },
                            ].map(({ icon, count }) => {
                                return (
                                    <div
                                        key={uuidv4()}
                                        className={cn(
                                            "flex",
                                            "justify-center",
                                            "gap-1",
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex",
                                                "items-center",
                                            )}
                                        >
                                            {icon}
                                        </div>
                                        <div>{count}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>{content}</div>
        </ItemLayout>
    );
}
