import delay from "@lib/time/delay";

describe("@lib/delay", () => {
    it("returns instanceOf Promise", () => {
        expect(delay(1)).toBeInstanceOf(Promise);
    });

    it("delays at least after 1000ms when passes '1000'", async () => {
        const startTime = Date.now();
        const delayTime = 1000;
        await delay(delayTime);

        const elapsedTime = Date.now() - startTime;
        expect(elapsedTime).toBeGreaterThanOrEqual(delayTime);
    });

    it("delays resolves immediately when passes '0'", async () => {
        const startTime = Date.now();
        await delay(0);

        const elapsedTime = Date.now() - startTime;
        expect(elapsedTime).toBeLessThan(10);
    });
});
