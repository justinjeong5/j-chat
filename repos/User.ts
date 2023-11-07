import delay from "lib/time/delay";
import User from "models/User";
import BaseRepo from "repos/BaseRepo";
import { TQuery } from "types/common.type";
import IUser, { TUser, TUserField } from "types/user.type";

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
            .then(({ data }) => ({
                results: data.results.map(r => new User(r)),
            }));
    }

    async create(user: TUser, query?: TQuery): Promise<IUser> {
        return this.client
            .post(this.buildUrl("create", query), user)
            .then(({ data }) => new User(data));
    }

    async update(id: string, field: TUser, query?: TQuery): Promise<IUser> {
        return this.client
            .patch(this.buildUrl("update", query, { id }), field)
            .then(({ data }) => new User(data));
    }

    async patch(user: TUser, query?: object): Promise<IUser> {
        return this.client
            .patch(this.buildUrl("patch", query), user)
            .then(({ data }) => new User(data));
    }

    async init(): Promise<IUser> {
        return this.client.get("/user/init").then(({ data }) => {
            return new User(data);
        });
    }

    async login(user: TUserField): Promise<IUser> {
        return this.client.post("/user/login", user).then(({ data }) => {
            return new User(data.user);
        });
    }

    async logout(): Promise<void> {
        return this.client.post("/user/logout");
    }

    async signup(user: TUser): Promise<IUser> {
        return this.client.post("/user/signup", user).then(({ data }) => {
            return new User(data);
        });
    }
}

export default new UserRepo("/user/users");
