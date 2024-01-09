import User from "@models/User";
import BaseRepo from "@repos/BaseRepo";
import IUser, { TUser, TUserField } from "@t/user.type";

class UserRepo extends BaseRepo {
    async init(): Promise<IUser> {
        return this.client.get("/init").then(({ data }) => {
            return new User(data);
        });
    }

    async login(user: TUserField): Promise<IUser> {
        return this.client.post("/login", user).then(({ data }) => {
            return new User(data.user);
        });
    }

    async logout(): Promise<void> {
        return this.client.post("/logout");
    }

    async signup(user: TUser): Promise<IUser> {
        return this.client.post("/signup", user).then(({ data }) => {
            return new User(data);
        });
    }

    async editProfile(id: string, user: TUser, query = {}): Promise<IUser> {
        return this.client
            .patch(this.buildUrl("update", query, { id }), user)
            .then(({ data }) => new User(data));
    }
}

export default new UserRepo("/user");
