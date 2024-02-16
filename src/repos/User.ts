import GeneralUser from "@models/GeneralUser";
import User from "@models/User";
import BaseRepo from "@repos/BaseRepo";
import IUser, {
    TGeneralUser,
    TUser,
    TUserField,
    TUserSignupField,
} from "@t/user.type";

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

    async signup(user: TUserSignupField): Promise<IUser> {
        return this.client.post("/signup", user).then(({ data }) => {
            return new User(data);
        });
    }

    async editProfile(id: string, user: TUser, query = {}): Promise<IUser> {
        return this.client
            .patch(this.buildUrl("update", query, { id }), user)
            .then(({ data }) => new User(data));
    }

    async getUsers(
        query = {},
    ): Promise<{ results: TGeneralUser[]; count: number; hasMore: boolean }> {
        return this.client.get("/users", query).then(({ data }) => ({
            results: data.results.map(u => new GeneralUser(u)),
            count: data.count,
            hasMore: data.hasMore,
        }));
    }

    async authCode(email: string): Promise<void> {
        return this.client.post("/auth/email", { email });
    }
}

export default new UserRepo("/user");
