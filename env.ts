import packageJson from "./package.json";

const { API } = process.env;

const ENV = API || "DEV";
const APIS = {
    DEV: "http://localhost:3004",
    // PROD: "https://localhost:3004",
};

const env = {
    ENV,
    API: APIS[ENV],
    APIS,
    VERSION: packageJson.version,
};

console.log(`App Version: ${env.VERSION}`);
console.log(`Binding to API: ${env.ENV}, ${env.APIS[env.ENV]}`);

export default env;
