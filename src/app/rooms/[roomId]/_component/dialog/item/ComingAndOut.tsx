import { cn } from "@lib/utils";
import type { TMessageType } from "@t/message.type";
import type { TUser } from "@t/user.type";

export default function ComingAndOut({
    type,
    writer,
    createdAt,
}: {
    type: TMessageType;
    writer: TUser;
    createdAt: Date;
}) {
    const getMessage = (t: string, name) => {
        switch (t) {
            case "joinRoom":
                return `${name}님이 입장했습니다.`;
            case "leaveRoom":
                return `${name}님이 퇴장했습니다.`;
            default:
                return `${name}님이 입장했습니다.`;
        }
    };
    return (
        <div className={cn("py-4")}>
            <div className={cn("opacity-50")}>
                {new Date(createdAt).toLocaleString()}
            </div>
            <div>{getMessage(type, writer.username)}</div>
        </div>
    );
}
