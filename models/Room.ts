import BaseModel from "models/BaseModel";
import { IRoom, IRoomExternal, IRoomMenu } from "types/room";

export default class Room extends BaseModel {
    id: number;

    title: string;

    description: string;

    type: string;

    createdAt: Date;

    updatedAt: Date;

    users: Array<object>;

    dialogs: Array<object>;

    constructor(config: IRoomExternal) {
        super();
        this.id = config.id || null;
        this.title = config.title || null;
        this.description = config.description || null;
        this.type = config.type || null;
        this.createdAt = new Date(config.created_at);
        this.updatedAt = new Date(config.updated_at);
        this.users = config.users || [];
        this.dialogs = config.dialogs || [];
    }

    toMenu(): IRoomMenu {
        return {
            key: String(this.id),
            label: this.title,
            ...this,
        };
    }

    setDialogs(dialogs: Array<object>): IRoom {
        this.dialogs = dialogs;
        return { ...this };
    }

    toExternal(): IRoomExternal {
        return {
            ...this,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    }

    static toInternal(config: {
        title: string;
        type: string;
        description: string;
    }): IRoomExternal {
        return {
            id: null,
            users: [],
            dialogs: [],
            created_at: new Date(),
            updated_at: new Date(),
            ...config,
        };
    }
}
