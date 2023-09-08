import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { TQuery } from "types/common.type";

// const { API } = process.env;
const API = "http://localhost:3004";

const withAPI = (path: string = ""): string => API + path;

const withQS = (path: string = "", query: TQuery = {}): string => {
    if (Object.keys(query).length === 0) {
        return path;
    }
    return `${path}?${qs.stringify(query)}`;
};
const createClient = (...args): AxiosInstance => {
    const client = axios.create(...args);
    return client;
};

const createAPIClient = (
    config: { baseURL: string } = { baseURL: "" },
    ...args
): AxiosInstance => {
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
