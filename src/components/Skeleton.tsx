import { cn } from "@lib/utils";

export default function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "mb-3",
                "rounded-md",
                "bg-gradient-120",
                "bg-gradient-to-r",
                "from-[#dfdede]",
                "via-[#F0F0F0]",
                "to-[#dfdede]",
                "bg-[100%_0]",
                "bg-[length:200%]",
                "animate-load",
                className,
            )}
        />
    );
}
