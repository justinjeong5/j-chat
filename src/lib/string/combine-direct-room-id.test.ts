import md5 from "md5";

import combineDirectRoomId from "./combine-direct-room-id";

describe("combineDirectRoomId 함수 테스트", () => {
    it("Hash된 문자열의 길이는 12", () => {
        const userId = "user1";
        const otherUserId = "user2";

        const result = combineDirectRoomId(userId, otherUserId);

        expect(result.length).toEqual(12);
    });
    it("userId가 otherUserId보다 클 때", () => {
        const userId = "user1";
        const otherUserId = "user2";
        const hashedValue = md5(`${otherUserId}-${userId}`);

        const result = combineDirectRoomId(userId, otherUserId);

        expect(hashedValue.includes(result)).toBeTruthy();
    });

    it("userId가 otherUserId보다 작을 때", () => {
        const userId = "user2";
        const otherUserId = "user1";
        const hashedValue = md5(`${userId}-${otherUserId}`);

        const result = combineDirectRoomId(userId, otherUserId);

        expect(hashedValue.includes(result)).toBeTruthy();
    });
});
