export default function readableElapsedTime(timestamp: Date = new Date()) {
    const MINUTE = 60 * 1000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 4 * WEEK;
    const YEAR = 365 * DAY;

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
    if (elapsedTime < WEEK) {
        return `${Math.floor(elapsedTime / DAY)}일 전`;
    }
    if (elapsedTime < MONTH) {
        return `${Math.floor(elapsedTime / WEEK)}주 전`;
    }
    if (elapsedTime < YEAR) {
        return `${Math.floor(elapsedTime / MONTH)}달 전`;
    }
    return `${Math.floor(elapsedTime / YEAR)}년 전`;
}
