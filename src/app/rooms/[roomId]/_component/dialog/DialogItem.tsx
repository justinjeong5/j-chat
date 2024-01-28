import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import ComingAndOut from "@app/rooms/[roomId]/_component/dialog/item/ComingAndOut";
import { cn } from "@lib/utils";
import type { FixMe } from "@t/common.type";
import type { TMessageType } from "@t/message.type";
import type { TUser } from "@t/user.type";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

function ItemLayout({ children }) {
    return (
        <div className={cn("flex", "flex-col", "gap-4", "py-4", "px-2")}>
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
    if (["joinRoom", "leaveRoom"].includes(type)) {
        return (
            <ItemLayout>
                <ComingAndOut
                    type={type}
                    createdAt={createdAt}
                    writer={writer}
                />
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
                                {new Date(createdAt).toLocaleString()}
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
