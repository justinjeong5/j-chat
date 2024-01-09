import { cn } from "./utils";

describe("utils", () => {
    describe("cn", () => {
        it("클래스 값을 올바르게 결합하는지 확인합니다.", () => {
            const result = cn("class1", "class2", "class3");
            expect(result).toBe("class1 class2 class3");
        });

        it("빈 문자열이 입력될 경우 빈 문자열을 반환하는지 확인합니다.", () => {
            const result = cn();
            expect(result).toBe("");
        });

        it("undefined나 null값이 입력될 경우 무시하고 올바른 값을 반환하는지 확인합니다.", () => {
            const result = cn("class1", undefined, null, "class2");
            expect(result).toBe("class1 class2");
        });
    });
});
