import axios from "axios";
import qs from "qs";

// const { API } = process.env;
const API = "http://localhost:3004";

const withAPI = (path = "") => API + path;

const withQS = (path = "", { ...query } = {}, added = {}) =>
    `${path}?${qs.stringify({ ...query, ...added })}`;

const createClient = (...args) => {
    const client = axios.create(...args);
    return client;
};

const createAPIClient = (config = { baseURL: "" }, ...args) => {
    const baseURL = withAPI(config.baseURL);
    return createClient(
        {
            ...config,
            baseURL,
        },
        ...args,
    );
};

export { createAPIClient, createClient, withAPI, withQS };

export default createClient({ baseURL: API });