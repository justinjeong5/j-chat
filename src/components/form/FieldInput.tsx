import { cn } from "@lib/utils";

export default function FieldInput({
    className,
    value,
    disabled,
    onChange,
    type = "text",
    error = "",
    icon,
    placeholder,
}: {
    className?: string;
    value: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password";
    error?: string | null;
    icon?: React.ReactNode;
    placeholder?: string;
}) {
    return (
        <div>
            <div
                className={cn(
                    cn(
                        "flex",
                        "items-center",
                        "gap-1",
                        "px-3",
                        "py-1",
                        "border-slate-300",
                        "border-solid",
                        "border-[1px]",
                        "rounded-md",
                        disabled && "bg-slate-200",
                        disabled && "cursor-not-allowed",
                        disabled && "opacity-50",
                    ),
                    className,
                )}
            >
                {icon}
                <input
                    className={cn(
                        "outline-none",
                        "w-full",
                        disabled && "cursor-not-allowed",
                    )}
                    value={value}
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
            {error && (
                <div className={cn("mx-3", "text-rose-600")}>{error}</div>
            )}
        </div>
    );
}
