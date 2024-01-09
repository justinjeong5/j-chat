import { cn } from "@lib/utils";

export default function LottieLayout({ children }) {
    return (
        <div
            className={cn(
                "flex",
                "justify-center",
                "items-center",
                "w-screen",
                "h-[calc(100vh-80px)]",
            )}
        >
            <div className={cn("max-w-[480px]")}>{children}</div>
        </div>
    );
}
