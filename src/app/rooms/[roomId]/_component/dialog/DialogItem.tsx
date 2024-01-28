import ComingAndOut from "@app/rooms/[roomId]/_component/dialog/item/ComingAndOut";
import { cn } from "@lib/utils";
import Image from "next/image";

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
    writer,
    createdAt,
}: {
    type: "joinRoom" | "leaveRoom";
    content: string;
    writer: any;
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
                    src={writer.avatar}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    blurDataURL={writer.avatar}
                    placeholder="blur"
                />
                <div>
                    <div>{writer.username}</div>
                    <div className={cn("opacity-50")}>
                        {new Date(createdAt).toLocaleString()}
                    </div>
                </div>
            </div>
            <div>{content}</div>
        </ItemLayout>
    );
}
