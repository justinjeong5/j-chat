import { cn } from "@lib/utils";

export default function FieldActive({ children }) {
    return (
        <div
            className={cn(
                "cursor-pointer",
                "bg-[white]",
                "transition",
                "duration-300",
                "rounded-[5px]",
                "p-[3px]",
                "hover:bg-[#dedede]",
            )}
        >
            {children}
        </div>
    );
}
