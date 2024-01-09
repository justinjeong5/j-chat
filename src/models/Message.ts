/* eslint-disable no-underscore-dangle */
import BaseModel from "@models/BaseModel";
import UserModel from "@models/User";
import { TCommon } from "@t/common.type";
import IMessage, { TCountType, TMessage, TMessageField } from "@t/message.type";
import { TUser } from "@t/user.type";

export default class Message extends BaseModel implements IMessage {
    id: string;

    roomId: string;

    writer: TUser;

    type: string;

    image: string;

    content: string;

    stars: Array<TCommon>;

    likes: Array<TCommon>;

    comments: Array<TCommon>;

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

    getCount(type: TCountType): number {
        return this[type].length;
    }

    static createItem(config: TMessageField): TMessage {
        return {
            ...config,
            image: "",
            content: "",
            type: "plain",
            stars: [],
            likes: [],
            comments: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    toExternal(): TMessage {
        return {
            ...this,
            writer: this.writer.id,
        };
    }
}
