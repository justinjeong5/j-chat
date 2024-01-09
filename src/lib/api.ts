import { TQuery } from "@t/common.type";
import axios, { AxiosInstance } from "axios";
import qs from "qs";

const withAPI = (path: string = ""): string =>
    process.env.NEXT_PUBLIC_API + path;

const withQS = (path: string = "", query: TQuery = {}): string => {
    if (Object.keys(query).length === 0) {
        return path;
    }
    return `${path}?${qs.stringify(query)}`;
};
const createClient = (...args): AxiosInstance => {
    const client = axios.create(...args);
    axios.defaults.withCredentials = true;
    return client;
};

const createAPIClient = (
    config: { baseURL: string },
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

export default createClient({ baseURL: process.env.NEXT_PUBLIC_API });
