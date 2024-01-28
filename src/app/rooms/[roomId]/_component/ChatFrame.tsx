import { cn } from "@lib/utils";
import { useEffect, useMemo, useState } from "react";

export default function ChatFrame({
    dialog,
    typing = "",
    textator,
}: {
    dialog: React.ReactNode;
    typing?: string;
    textator: React.ReactNode;
}) {
    const [scroll, setScroll] = useState("bottom");

    useEffect(() => {
        const el = document.querySelector("#shadow-scroll");
        const scrollHandler = e => {
            if (
                e.target.scrollHeight - e.target.scrollTop ===
                e.target.clientHeight
            ) {
                setScroll("bottom");
            } else if (e.target.scrollTop === 0) {
                setScroll("top");
            } else {
                setScroll("middle");
            }
        };
        el?.addEventListener("scroll", scrollHandler);
        return () => {
            el?.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    const dialogClass = useMemo(() => {
        return cn(
            "h-[calc(100vh-311px)]",
            "w-[1100px]",
            "max-w-full",
            "mb-4",
            "overflow-scroll",
            scroll === "top" && "shadow-scroll-down",
            scroll === "middle" && "shadow-scroll-both",
            scroll === "bottom" && "shadow-scroll-up",
        );
    }, [scroll]);

    return (
        <div className={cn("h-full")}>
            <div id="shadow-scroll" className={dialogClass}>
                {dialog}
            </div>
            <div className={cn("h-4", "pl-2", "opacity-60")}>{typing}</div>
            <div className={cn("mt-4")}>{textator}</div>
        </div>
    );
}
