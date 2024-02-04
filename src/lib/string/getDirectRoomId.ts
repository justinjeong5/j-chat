import md5 from "md5";

export default function getDirectRoomId(
    userId: string,
    otherUserId: string,
): string {
    const concatenated =
        userId > otherUserId
            ? `${userId}-${otherUserId}`
            : `${otherUserId}-${userId}`;
    return md5(concatenated).slice(0, 12);
}
