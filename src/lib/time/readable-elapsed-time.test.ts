import getElapsedTime from "@lib/time/readable-elapsed-time";

describe("getElapsedTime 함수 테스트", () => {
    it('1분 이내의 시간은 "조금 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("조금 전");
    });

    it('1분 이상 지난 시간은 "1분 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setMinutes(timestamp.getMinutes() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1분 전");
    });

    it('1시간 이상 지난 시간은 "1시간 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1시간 전");
    });

    it('1일 이상 지난 시간은 "1일 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setDate(timestamp.getDate() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1일 전");
    });

    it('1주일 이상 지난 시간은 "1주 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setDate(timestamp.getDate() - 7);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1주 전");
    });

    it('1개월 이상 지난 시간은 "1달 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setMonth(timestamp.getMonth() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1달 전");
    });

    it('1년 이상 지난 시간은 "1년 전"으로 반환되어야 합니다.', () => {
        const timestamp = new Date();
        timestamp.setFullYear(timestamp.getFullYear() - 1);
        const result = getElapsedTime(timestamp);
        expect(result).toBe("1년 전");
    });
});
