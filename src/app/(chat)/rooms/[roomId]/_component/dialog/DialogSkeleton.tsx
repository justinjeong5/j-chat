import Skeleton from "@components/Skeleton";
import { cn } from "@lib/utils";
import { v4 as uuidv4 } from "uuid";

export default function DialogSkeleton() {
    const SKELETON_COUNT = 5;

    return (
        <>
            {Array.from({ length: SKELETON_COUNT }).map(() => (
                <div
                    className={cn("flex", "gap-4", "w-full", "my-8")}
                    key={uuidv4()}
                >
                    <div className={cn("w-full")}>
                        <div className={cn("flex", "gap-4")}>
                            <Skeleton
                                className={cn("rounded-full", "w-10", "h-10")}
                            />
                            <div>
                                <Skeleton className={cn("h-4", "w-20")} />
                                <Skeleton className={cn("h-4", "w-20")} />
                            </div>
                        </div>
                        <div className={cn("block")}>
                            {Array.from({ length: 3 }).map(() => (
                                <Skeleton
                                    key={uuidv4()}
                                    className={cn("h-4", "w-full", "mb-3")}
                                />
                            ))}
                        </div>
                        <div className={cn("flex", "gap-4", "justify-end")}>
                            {Array.from({ length: 3 }).map(() => (
                                <Skeleton
                                    key={uuidv4()}
                                    className={cn("h-6", "w-12")}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
