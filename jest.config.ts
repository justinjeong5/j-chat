import type { Config } from "jest";

const config: Config = {
    clearMocks: true,
    coverageProvider: "v8",

    modulePaths: ["<rootDir>/"],
    moduleDirectories: ["node_modules"],
    moduleFileExtensions: [
        "js",
        "mjs",
        "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
    ],
    moduleNameMapper: {
        // tsconfig.json의 alias와 동일하게 설정
        "@lib/(.*)": "<rootDir>/src/lib/$1",
    },
    roots: ["<rootDir>"],
};

export default config;
