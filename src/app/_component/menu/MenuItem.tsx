import { cn } from "@lib/utils";

export default function MenuItem({ onClick, title }) {
    return (
        <div
            className={cn(
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
            {title}
        </div>
    );
}
