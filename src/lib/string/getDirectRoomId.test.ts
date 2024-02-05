import md5 from "md5";

import getDirectRoomId from "./getDirectRoomId";

describe("getDirectRoomId 함수 테스트", () => {
    it("Hash된 문자열의 길이는 12", () => {
        const userId = "user1";
        const otherUserId = "user2";

        const result = getDirectRoomId(userId, otherUserId);

        expect(result.length).toEqual(12);
    });
    it("userId가 otherUserId보다 클 때", () => {
        const userId = "user1";
        const otherUserId = "user2";
        const hashedValue = md5(`${otherUserId}-${userId}`);

        const result = getDirectRoomId(userId, otherUserId);

        expect(hashedValue.includes(result)).toBeTruthy();
    });

    it("userId가 otherUserId보다 작을 때", () => {
        const userId = "user2";
        const otherUserId = "user1";
        const hashedValue = md5(`${userId}-${otherUserId}`);

        const result = getDirectRoomId(userId, otherUserId);

        expect(hashedValue.includes(result)).toBeTruthy();
    });
});
