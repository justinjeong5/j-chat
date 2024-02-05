import Avatar from "@components/Avatar";
import { cn } from "@lib/utils";
import { TRoomType } from "@t/room.type";

const activeIconClass = cn(
    "absolute",
    "right-[-2px]",
    "bottom-[-1px]",
    "rounded-full",
    "w-2",
    "h-2",
    "bg-white",
);

export default function MenuItem({
    title,
    images = [],
    selected = false,
    type = "public",
    active = false,
    onClick,
}: {
    title: string;
    images?: string[];
    selected?: boolean;
    type?: TRoomType;
    active?: boolean;
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
                selected && "bg-gray-100",
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
                                activeIconClass,
                                active
                                    ? "bg-green-500"
                                    : cn(
                                          "border-slate-500",
                                          "border-solid",
                                          "border-2",
                                      ),
                            )}
                        />
                    )}
                </div>
            </div>
            <div>{title}</div>
        </div>
    );
}
