import BaseModel from "@models/BaseModel";
import { TUser } from "@t/user.type";

export default class User extends BaseModel {
    id: string;

    role: string;

    email: string;

    username: string;

    description: string;

    avatar: string;

    rooms: Array<object>;

    dialog: Array<object>;

    likes: Array<object>;

    comments: Array<object>;

    stars: Array<object>;

    lastLogin: Date;

    updatedAt: Date;

    createdAt: Date;

    constructor(config: TUser) {
        super();
        this.id = config.id || "";
        this.role = config.role || "";

        this.email = config.email || "";
        this.username = config.username || "";
        this.description = config.description || "";
        this.avatar = config.avatar || "";

        this.rooms = config.rooms || [];
        this.stars = config.stars || [];

        this.dialog = config.dialog || [];
        this.likes = config.likes || [];
        this.comments = config.comments || [];

        this.lastLogin = config.lastLogin || new Date();
        this.updatedAt = config.updatedAt || new Date();
        this.createdAt = config.createdAt || new Date();
    }

    toExternal(): TUser {
        return {
            ...this,
        };
    }
}
