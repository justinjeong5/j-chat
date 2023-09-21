import BaseModel from "models/BaseModel";
import { TUser } from "types/user.type";

export default class User extends BaseModel {
    id: string;

    email: string;

    username: string;

    avatar: string;

    constructor(config: TUser) {
        super();
        this.id = config.id;
        this.email = config.email;
        this.username = config.username;
        this.avatar = config.avatar;
    }

    static createItem(config: TUser): TUser {
        return {
            id: null,
            email: config.email,
            username: config.username || "",
            avatar: config.avatar,
        };
    }

    toExternal(): TUser {
        return {
            ...this,
        };
    }
}
