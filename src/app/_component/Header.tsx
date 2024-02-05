import { cn } from "@lib/utils";

export default function Header({
    title,
    actions,
    children,
}: {
    title: string;
    actions?: React.ReactNode;
    children?: React.ReactNode;
}) {
    return (
        <div className={cn("flex", "justify-between", "mb-4")}>
            <div className={cn("flex", "flex-col", "gap-2")}>
                <div className={cn("font-semibold", "text-lg")}>
                    Header{title}
                </div>
                <div>{children}</div>
            </div>
            <div className={cn("mx-2")}>{actions}</div>
        </div>
    );
}
