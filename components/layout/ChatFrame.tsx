import { cn } from "@lib/utils";

export default function ChatFrame({ dialog, typing = null, textator }) {
    return (
        <div className={cn("h-full")}>
            <div
                className={cn(
                    "h-[calc(100vh-311px)]",
                    "w-[1100px]",
                    "max-w-full",
                    "mb-4",
                    "overflow-scroll",
                )}
            >
                {dialog}
            </div>
            <div className={cn("h-4", "pl-2", "opacity-60")}>{typing}</div>
            <div className={cn("mt-4")}>{textator}</div>
        </div>
    );
}
