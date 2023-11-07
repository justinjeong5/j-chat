/* eslint-disable class-methods-use-this */
import { AxiosInstance } from "axios";
import { createAPIClient, withAPI, withQS } from "lib/api";
import isNil from "lodash/isNil";
import { TCommon, TQuery, TWithID } from "types/common.type";

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

abstract class BaseModel {
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

    abstract list(query?: TQuery): Promise<{ results: Array<TCommon> }>;
    abstract create(data: object, query?: TQuery): Promise<TCommon>;
    abstract update(id: string, data: object, query?: TQuery): Promise<TCommon>;
    abstract patch(data: object, query?: TQuery): Promise<TCommon>;
    abstract get(id: string, query?: TQuery): Promise<TCommon>;
}

export default BaseModel;
