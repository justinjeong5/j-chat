import { cn } from "@lib/utils";
import { v4 as uuidv4 } from "uuid";

export default function DialogSkeleton() {
    const SKELETON_COUNT = 5;
    const skeletonClass = cn(
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
    );
    return (
        <>
            {Array.from({ length: SKELETON_COUNT }).map(() => (
                <div
                    className={cn("flex", "gap-4", "w-full", "mt-8")}
                    key={uuidv4()}
                >
                    <div className={cn("flex", "gap-4")}>
                        <div>
                            <div className={cn("flex", "gap-4")}>
                                <div
                                    className={cn(
                                        skeletonClass,
                                        "rounded-full",
                                        "w-10",
                                        "h-10",
                                    )}
                                />
                                <div>
                                    <div
                                        className={cn(
                                            skeletonClass,
                                            "h-4",
                                            "w-20",
                                        )}
                                    />
                                    <div
                                        className={cn(
                                            skeletonClass,
                                            "h-4",
                                            "w-40",
                                        )}
                                    />
                                </div>
                            </div>
                            {Array.from({ length: 3 }).map(() => (
                                <div
                                    key={uuidv4()}
                                    className={cn(
                                        skeletonClass,
                                        "h-4",
                                        "w-100",
                                        "mb-3",
                                    )}
                                />
                            ))}
                            <div className={cn("flex", "gap-4", "justify-end")}>
                                {Array.from({ length: 3 }).map(() => (
                                    <div
                                        key={uuidv4()}
                                        className={cn(
                                            skeletonClass,
                                            "h-6",
                                            "w-12",
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={cn(skeletonClass, "w-20", "h-20")} />
                    </div>
                </div>
            ))}
        </>
    );
}
