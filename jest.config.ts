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
    roots: ["<rootDir>"],
};

export default config;
