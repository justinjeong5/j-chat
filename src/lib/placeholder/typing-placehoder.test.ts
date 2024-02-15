import typingPlaceholder from "./typing-placeholder";

describe("string/typingPlaceholder", () => {
    [
        {
            users: [],
            expected: "",
        },
        {
            users: [{ id: "1", username: "Alice" }],
            expected: "Alice님이 대화를 입력중입니다.",
        },
        {
            users: [
                { id: "1", username: "Alice" },
                { id: "2", username: "Bob" },
            ],
            expected: "Alice, Bob님이 대화를 입력중입니다.",
        },
        {
            users: [
                { id: "1", username: "Alice" },
                { id: "2", username: "Bob" },
                { id: "3", username: "Charlie" },
            ],
            expected: "Alice, Bob님 외 1명이 대화를 입력중입니다.",
        },
        {
            users: [
                { id: "1", username: "Alice" },
                { id: "2", username: "Bob" },
                { id: "3", username: "Charlie" },
                { id: "4", username: "Dane" },
                { id: "5", username: "Echo" },
            ],
            expected: "Alice, Bob님 외 3명이 대화를 입력중입니다.",
        },
    ].forEach(({ users, expected }) => {
        it(`배열에 ${users.length} 명의 사용자가 있을 때, 올바른 결과를 반환해야 합니다.`, () => {
            const result = typingPlaceholder(users);
            expect(result).toBe(expected);
        });
    });
});
