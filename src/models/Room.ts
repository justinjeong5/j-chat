import BaseModel from "@models/BaseModel";
import { TMessage } from "@t/message.type";
import { TRoomField, TRoomType } from "@t/room.type";
import { TGeneralUser } from "@t/user.type";

export default class Room extends BaseModel {
    id: string;

    title: string;

    description: string;

    type: string;

    starred: boolean;

    createdAt: Date;

    updatedAt: Date;

    users: Array<TGeneralUser>;

    dialog: Array<TMessage>;

    constructor(config) {
        super();
        this.id = config.id || "";
        this.title = config.title || "";
        this.description = config.description || "";
        this.type = config.type || "";
        this.starred = !!config.starred || false;
        this.createdAt = new Date(config.createdAt || new Date());
        this.updatedAt = new Date(config.updatedAt || new Date());
        this.users = config.users || [];
        this.dialog = config.dialog || [];
    }

    static createItem(config: TRoomField): TRoomField {
        return {
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
