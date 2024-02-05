import { cn } from "@lib/utils";
import { Card } from "antd";

export default function AccountLayout({ children }) {
    return (
        <div
            className={cn(
                "flex",
                "justify-center",
                "items-center",
                "w-screen",
                "h-screen",
            )}
        >
            <Card className={cn("w-[500px]")}>{children}</Card>
        </div>
    );
}
