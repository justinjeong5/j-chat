/* eslint-disable class-methods-use-this */
import { AxiosInstance } from "axios";
import { createAPIClient, withAPI, withQS } from "lib/api";
import isNil from "lodash/isNil";
import { TCommon } from "types/common";

export const defaultAPIClient = createAPIClient({ baseURL: "" });

interface IActions {
    list: () => string;
    create: () => string;
    get: ({ id }: { id: string }) => string;
    update: ({ id }: { id: string }) => string;
    patch: ({ id }: { id: string }) => string;
}

const defaultActions = (url: string): IActions => ({
    list: () => url,
    create: () => url,
    get: ({ id }) => {
        if (isNil(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return `${url}/${id}`;
    },
    update: ({ id }) => {
        if (isNil(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return `${url}/${id}`;
    },
    patch: ({ id }) => {
        if (isNil(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return `${url}/${id}`;
    },
});

class BaseModel {
    client: TCommon;

    actions: TCommon;

    constructor(
        url: string = "",
        actions: (url: string) => IActions = defaultActions,
        client: AxiosInstance = defaultAPIClient,
    ) {
        this.client = client;
        this.actions = {
            ...defaultActions(withAPI(url)),
            ...actions(withAPI(url)),
        };
    }

    buildUrl(method, query, urlParams = {}) {
        const baseWithPath = this.actions[method](urlParams, query);
        return withQS(baseWithPath, query);
    }

    async list(query: object): Promise<{ data: { results: Array<any> } }> {
        const url = this.buildUrl("list", query);
        return this.client.get(url);
    }

    async create(data: object, query?): Promise<{ data: TCommon }> {
        const url = this.buildUrl("create", query);
        return this.client.post(url, data);
    }

    async update(data: { id: string }, query?): Promise<{ data: TCommon }> {
        const url = this.buildUrl("update", query, { id: data.id });
        return this.client.put(url, data);
    }

    async patch(data: { id: string }, query?): Promise<{ data: TCommon }> {
        const url = this.buildUrl("patch", query, { id: data.id });
        return this.client.patch(url, data);
    }

    async get(id: string, query?): Promise<{ data: TCommon }> {
        const url = this.buildUrl("get", query, { id });
        return this.client.get(url);
    }
}

export default BaseModel;
