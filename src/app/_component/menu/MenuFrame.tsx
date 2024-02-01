import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { cn } from "@lib/utils";
import { useState } from "react";

export default function MenuFrame({ label, icon, children }) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(prev => !prev);
    };

    return (
        <div className={cn()} role="presentation" onClick={toggleOpen}>
            <div
                className={cn(
                    "flex",
                    "justify-between",
                    "items-center",
                    "mx-2",
                    "mt-2",
                    "py-2",
                    "px-4",
                    "rounded-lg",
                    "hover:bg-gray-100",
                    "cursor-pointer",
                    "transition-colors",
                    "duration-300",
                )}
            >
                <div className={cn("flex", "gap-2", "items-center")}>
                    <div className={cn("leading-3")}>{icon}</div>
                    <div>{label}</div>
                </div>
                <div className={cn("leading-3")}>
                    {open ? <DownOutlined /> : <UpOutlined />}
                </div>
            </div>
            {open && (
                <div className={cn("p-4", "py-1", "mx-4")}>{children}</div>
            )}
        </div>
    );
}
