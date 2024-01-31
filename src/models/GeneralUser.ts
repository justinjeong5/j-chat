import { TGeneralUser } from "@t/user.type";

export default class GeneralUser {
    id: string;

    role: string;

    email: string;

    username: string;

    description: string;

    avatar: string;

    lastLogin: Date;

    updatedAt: Date;

    createdAt: Date;

    constructor(config: TGeneralUser) {
        this.id = config.id || "";
        this.role = config.role || "";

        this.email = config.email || "";
        this.username = config.username || "";
        this.description = config.description || "";
        this.avatar = config.avatar || "";

        this.lastLogin = config.lastLogin || new Date();
        this.updatedAt = config.updatedAt || new Date();
        this.createdAt = config.createdAt || new Date();
    }
}
