import BaseModel from "@models/BaseModel";
import { TMessage } from "@t/message.type";
import { TRoom, TRoomField, TRoomType } from "@t/room.type";

export default class Room extends BaseModel {
    id: string;

    title: string;

    description: string;

    type: string;

    starred: boolean;

    createdAt: Date;

    updatedAt: Date;

    users: Array<object>;

    dialog: Array<TMessage>;

    constructor(config: TRoom) {
        super();
        this.id = config.id || "";
        this.title = config.title || "";
        this.description = config.description || "";
        this.type = config.type || "";
        this.starred = !!config.starred || false;
        this.createdAt = new Date(config.createdAt);
        this.updatedAt = new Date(config.updatedAt);
        this.users = config.users || [];
        this.dialog = config.dialog || [];
    }

    static createItem(config: TRoomField): TRoom {
        return {
            id: "",
            users: [],
            dialog: [],
            starred: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...config,
        };
    }

    static get PUBLIC(): TRoomType {
        return "public";
    }

    static get DIRECT(): TRoomType {
        return "direct";
    }
}
