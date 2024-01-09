/* eslint-disable class-methods-use-this */
import { createAPIClient, withQS } from "@lib/api";
import { TQuery, TWithID } from "@t/common.type";
import { AxiosInstance } from "axios";
import isNil from "lodash/isNil";

const defaultActions = {
    list: () => "",
    create: () => "",
    get: ({ id }: TWithID) => {
        if (isNil(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return `/${id}`;
    },
    update: ({ id }: TWithID) => {
        if (isNil(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return `/${id}`;
    },
    patch: ({ id }: TWithID) => {
        if (isNil(id)) {
            throw new Error(`Invalid ID: ${id}`);
        }
        return `/${id}`;
    },
};

abstract class BaseModel {
    client: AxiosInstance;

    constructor(url: string = "") {
        this.client = createAPIClient({ baseURL: url });
    }

    buildUrl(
        method: "get" | "list" | "create" | "update" | "patch",
        query?: TQuery,
        urlParams?: { id?: string | number | undefined },
    ): string {
        const baseWithPath = defaultActions[method](urlParams || {});
        return withQS(baseWithPath, query);
    }
}

export default BaseModel;
