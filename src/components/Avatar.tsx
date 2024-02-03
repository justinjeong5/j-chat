import { UserOutlined } from "@ant-design/icons";
import { cn } from "@lib/utils";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const AVATAR_COUNT = 2;
const imageCN = cn("w-6", "h-6", "rounded-lg", "bg-slate-200");
const flexCenterCN = cn("flex", "justify-center", "items-center");

function AvatarLayout({ children }) {
    return <div className={cn(flexCenterCN)}>{children}</div>;
}

export default function Avatar({ images = [] }: { images: string[] }) {
    if (!images.length) {
        return (
            <AvatarLayout>
                <div className={cn(flexCenterCN, imageCN)}>
                    <UserOutlined />
                </div>
            </AvatarLayout>
        );
    }
    if (images.length === 1) {
        return (
            <AvatarLayout>
                <Image
                    className={cn(imageCN)}
                    src={images[0]}
                    alt="avatar"
                    width={6}
                    height={6}
                />
            </AvatarLayout>
        );
    }
    if (images.length <= 3) {
        return (
            <AvatarLayout>
                {images
                    .filter((_, i) => i < AVATAR_COUNT + 1)
                    .map(image => (
                        <Image
                            key={uuidv4()}
                            className={cn("mr-[-7px]", imageCN)}
                            src={image}
                            alt="avatar"
                            width={6}
                            height={6}
                        />
                    ))}
            </AvatarLayout>
        );
    }
    return (
        <AvatarLayout>
            {images
                .filter((_, i) => i < AVATAR_COUNT)
                .map(image => (
                    <Image
                        className={cn("mr-[-7px]", imageCN)}
                        key={uuidv4()}
                        src={image}
                        alt="avatar"
                        width={6}
                        height={6}
                    />
                ))}
            {images.length > AVATAR_COUNT && (
                <div
                    className={cn(
                        flexCenterCN,
                        imageCN,
                        "text-xs",
                        "text-slate-500",
                    )}
                >
                    +{images.length - AVATAR_COUNT}
                </div>
            )}
        </AvatarLayout>
    );
}
