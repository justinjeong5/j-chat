import { cn } from "@lib/utils";
import { Divider } from "antd";

export default function MenuFrame({ profile, footer, children }) {
    return (
        <div
            className={cn(
                "flex",
                "flex-col",
                "justify-between",
                "h-[calc(100vh-52px)]",
                "m-4",
                "overflow-hidden",
            )}
        >
            <div>
                {profile}
                <Divider />
                <div
                    className={cn(
                        "max-h-[calc(100vh-288px)]",
                        "overflow-scroll",
                    )}
                >
                    {children}
                </div>
            </div>
            <div
                className={cn(
                    "h-[82px]",
                    "w-[268px]",
                    "bg-[white]",
                    "text-[#A0A0A0]",
                )}
            >
                <Divider />
                <div className={cn("m-4")}>{footer}</div>
            </div>
        </div>
    );
}
