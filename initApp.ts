import env from "./env";

export default () => {
    if (env.ENV === "DEV") {
        console.log("DEV mode");
    }
};
