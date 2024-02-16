import emailValidation from "./email-pattern-validation";

describe("emailValidation", () => {
    describe("유효한 이메일 주소", () => {
        [
            "test@example.com",
            "user123@gmail.com",
            "john.doe@example.co.uk",
        ].forEach(email => {
            it(email, () => {
                expect(emailValidation(email)).toBe(true);
            });
        });
    });

    describe("유효하지 않은 이메일 주소", () => {
        ["test", "user@example", "invalid@.com", "invalid@domain"].forEach(
            email => {
                it(email, () => {
                    expect(emailValidation(email)).toBe(false);
                });
            },
        );
    });
});
