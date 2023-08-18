import axios from "axios";
import qs from "qs";

const { API } = process.env;

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

export { createAPIClient, createClient, withQS };

export default createClient({ baseURL: API });
