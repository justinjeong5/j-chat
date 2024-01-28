import { cn } from "@lib/utils";
import { Empty } from "antd";

export default function DialogEmpty() {
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
