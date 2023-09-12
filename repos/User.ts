import delay from "lib/time/delay";
import User from "models/User";
import BaseRepo from "repos/BaseRepo";
import { TQuery } from "types/common.type";
import IUser, { TUser } from "types/user.type";

class UserRepo extends BaseRepo {
    async get(id: string, query?: TQuery): Promise<IUser> {
        return this.client
            .get(this.buildUrl("get", query, { id }))
            .then(({ data }) => new User(data));
    }

    async list(query?: TQuery): Promise<{ results: Array<IUser> }> {
        await delay(400);
        return this.client
            .get(this.buildUrl("list", query))
            .then(({ data }) => ({ results: data.map(r => new User(r)) }));
    }

    async create(message: TUser, query?: TQuery): Promise<IUser> {
        return this.client
            .post(this.buildUrl("create", query), message)
            .then(({ data }) => new User(data));
    }

    async update(message: TUser, query?: TQuery): Promise<IUser> {
        return this.client
            .patch(this.buildUrl("update", query), message)
            .then(({ data }) => new User(data));
    }

    async patch(message: TUser, query?: object): Promise<IUser> {
        return this.client
            .patch(this.buildUrl("patch", query), message)
            .then(({ data }) => data);
    }
}

export default new UserRepo("/dialog");
