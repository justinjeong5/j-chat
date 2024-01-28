export default function readableElapsedTime(timestamp: Date = new Date()) {
    const MINUTE = 60 * 1000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;

    const currentTime = new Date().getTime();
    const targetTime = new Date(timestamp).getTime();

    const elapsedTime = currentTime - targetTime;

    if (elapsedTime < MINUTE) {
        return "조금 전";
    }
    if (elapsedTime < HOUR) {
        return `${Math.floor(elapsedTime / MINUTE)}분 전`;
    }
    if (elapsedTime < DAY) {
        return `${Math.floor(elapsedTime / HOUR)}시간 전`;
    }
    return `${Math.floor(elapsedTime / DAY)}일 전`;
}
