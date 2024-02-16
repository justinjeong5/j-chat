/* eslint-disable no-underscore-dangle */
import BaseModel from "@models/BaseModel";
import UserModel from "@models/User";
import type { FixMe } from "@t/common.type";
import type { TMessage, TMessageField, TMessageType } from "@t/message.type";
import type { TUser } from "@t/user.type";

export default class Message extends BaseModel {
    id: string;

    roomId: string;

    writer: TUser;

    type: TMessageType;

    image: string;

    content: string;

    stars: Array<FixMe>;

    likes: Array<FixMe>;

    comments: Array<FixMe>;

    createdAt: Date;

    updatedAt: Date;

    constructor(config: TMessage) {
        super();
        this.id = config.id || "";
        this.roomId = config.roomId || "";

        this.writer = config.writer || UserModel.createItem();
        this.content = config.content || "";
        this.image = config.image || "";

        this.stars = config.stars || [];
        this.likes = config.likes || [];
        this.comments = config.comments || [];

        this.createdAt = new Date(config.createdAt || new Date());
        this.updatedAt = new Date(config.updatedAt || new Date());
    }

    static createItem(config: TMessageField): TMessage {
        return {
            image: "",
            type: "plain",
            stars: [],
            likes: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            ...config,
        };
    }

    toExternal(): TMessage {
        return {
            ...this,
            writer: this.writer.id,
        };
    }
}
