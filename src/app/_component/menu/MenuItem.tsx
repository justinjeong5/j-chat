import Avatar from "@components/Avatar";
import { cn } from "@lib/utils";
import { TRoomType } from "@t/room.type";

export default function MenuItem({
    title,
    images = [],
    type = "public",
    onClick,
}: {
    title: string;
    images?: string[];
    type?: TRoomType;
    onClick: () => void;
}) {
    return (
        <div
            className={cn(
                "flex",
                "items-center",
                "gap-3",
                "py-2",
                "px-4",
                "mb-1",
                "w-full",
                "rounded-md",
                "cursor-pointer",
                "hover:bg-gray-200",
                "transition-colors",
                "duration-200",
            )}
            role="presentation"
            onClick={onClick}
        >
            <div>
                <div
                    className={cn("relative", "flex", "items-center", "gap-1")}
                >
                    <Avatar images={images} />
                    {type === "direct" && (
                        <div
                            className={cn(
                                "absolute",
                                "right-[-2px]",
                                "bottom-0",
                                "rounded-full",
                                "w-2",
                                "h-2",
                                "bg-green-500",
                            )}
                        />
                    )}
                </div>
            </div>
            <div>{title}</div>
        </div>
    );
}
