/* eslint-disable class-methods-use-this */
import { AxiosInstance } from "axios";
import { createAPIClient, withAPI, withQS } from "lib/api";
import isNil from "lodash/isNil";
import { TCommon, TQuery, TWithID } from "types/common";

export const defaultAPIClient = createAPIClient({ baseURL: "" });

type TActions = {
    list: () => string;
    create: () => string;
    get: ({ id }: TWithID) => string;
    update: ({ id }: TWithID) => string;
    patch: ({ id }: TWithID) => string;
};

const defaultActions = (url: string): TActions => ({
    list: () => url,
    create: () => url,
    get: ({ id }: TWithID) => {
        if (isNil(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return `${url}/${id}`;
    },
    update: ({ id }: TWithID) => {
        if (isNil(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return `${url}/${id}`;
    },
    patch: ({ id }: TWithID) => {
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
        actions: (url: string) => TActions = defaultActions,
        client: AxiosInstance = defaultAPIClient,
    ) {
        this.client = client;
        this.actions = {
            ...defaultActions(withAPI(url)),
            ...actions(withAPI(url)),
        };
    }

    buildUrl(method, query?: TQuery, urlParams = {}) {
        const baseWithPath = this.actions[method](urlParams, query);
        return withQS(baseWithPath, query);
    }

    async list(query?: TQuery): Promise<{ data: { results: Array<TCommon> } }> {
        const url = this.buildUrl("list", query);
        return this.client.get(url);
    }

    async create(data: object, query?: TQuery): Promise<{ data: TCommon }> {
        const url = this.buildUrl("create", query);
        return this.client.post(url, data);
    }

    async update(data: TWithID, query?: TQuery): Promise<{ data: TCommon }> {
        const url = this.buildUrl("update", query, { id: data.id });
        return this.client.put(url, data);
    }

    async patch(data: TWithID, query?: TQuery): Promise<{ data: TCommon }> {
        const url = this.buildUrl("patch", query, { id: data.id });
        return this.client.patch(url, data);
    }

    async get(id: string, query?: TQuery): Promise<{ data: TCommon }> {
        const url = this.buildUrl("get", query, { id });
        return this.client.get(url);
    }
}

export default BaseModel;
