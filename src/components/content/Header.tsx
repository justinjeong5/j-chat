import {
    CoffeeOutlined,
    EllipsisOutlined,
    PushpinOutlined,
    SendOutlined,
    UserOutlined,
} from "@ant-design/icons";
import FieldHover from "@components/form/FieldHover";
import { cn } from "@lib/utils";
import type { MenuProps } from "antd";
import { Dropdown, Skeleton } from "antd";
import { v4 as uuidv4 } from "uuid";

export default function Header({ room, loading, leaveRoom, toggleStarred }) {
    const items: MenuProps["items"] = [
        {
            label: "1st menu item",
            key: uuidv4(),
            onClick: () => console.log("1st menu item"),
        },
        {
            label: "2nd menu item",
            key: uuidv4(),
            onClick: () => console.log("2nd menu item"),
        },
        {
            type: "divider",
        },
        {
            label: "나가기",
            key: uuidv4(),
            onClick: () => leaveRoom(room.id),
        },
    ];

    return (
        <div
            className={cn(
                "flex",
                "justify-between",
                "items-center",
                "gap-4",
                "leading-4",
            )}
        >
            <div className={cn("block", "h-fit", "leading-4")}>
                <div className={cn("text-xl", "font-semibold", "mt-6", "mb-2")}>
                    {room.title || "채널 이름"}
                </div>
                <div>{room.description || "채널 설명"}</div>
            </div>
            <div
                className={cn(
                    "flex",
                    "justify-center",
                    "items-center",
                    "gap-4",
                )}
            >
                <div className={cn("flex", "items-center", "gap-2")}>
                    <UserOutlined />
                    {loading ? (
                        <Skeleton.Button active block size="small" />
                    ) : (
                        room.users.length
                    )}
                </div>
                <div className={cn("flex", "items-center", "gap-2")}>
                    <SendOutlined />
                    {loading ? (
                        <Skeleton.Button active block size="small" />
                    ) : (
                        room.dialog.length
                    )}
                </div>
                <div
                    className={cn("flex", "items-center", "gap-2")}
                    role="presentation"
                    onClick={toggleStarred}
                >
                    <FieldHover>
                        {room.starred ? (
                            <PushpinOutlined />
                        ) : (
                            <CoffeeOutlined />
                        )}
                    </FieldHover>
                </div>
                <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    placement="bottomRight"
                >
                    <div
                        className={cn(
                            "flex",
                            "items-center",
                            "gap-2",
                            "h-[18px]",
                        )}
                    >
                        <FieldHover>
                            <EllipsisOutlined />
                        </FieldHover>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}
