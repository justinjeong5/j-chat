import getElapsedTime from "@lib/time/readable-elapsed-time";

describe("getElapsedTime 함수 테스트", () => {
    it('1분 이내의 시간은 "초 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1초 전");
    });

    it('1분 이상 지난 시간은 "분 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setMinutes(timestamp.getMinutes() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1분 전");
    });

    it('1시간 이상 지난 시간은 "시간 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1시간 전");
    });

    it('1일 이상 지난 시간은 "일 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setDate(timestamp.getDate() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1일 전");
    });
});
