import BaseModel from "models/BaseModel";
import { TUser, TUserField } from "types/user.type";

export default class User extends BaseModel {
    id: string;

    email: string;

    password: string;

    username: string;

    avatar: URL;

    constructor(config: TUser) {
        super();
        this.id = config.id;
        this.email = config.email;
        this.password = config.password;
        this.username = config.username;
        this.avatar = config.avatar;
    }

    static createItem(config: TUserField): TUser {
        return {
            id: null,
            email: config.email,
            password: config.password,
            username: "",
            avatar: null,
        };
    }

    toExternal(): TUser {
        return {
            ...this,
        };
    }
}
