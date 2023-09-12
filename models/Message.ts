import BaseModel from "models/BaseModel";
import { TCommon } from "types/common.type";
import IMessage, {
    TCountType,
    TMessage,
    TMessageField,
} from "types/message.type";

export default class Message extends BaseModel implements IMessage {
    id: string;

    roomId: string;

    name: string;

    href: string;

    image: string;

    description: string;

    avatar: string;

    status: string;

    content: string;

    createdAt: Date;

    updatedAt: Date;

    stars: Array<TCommon>;

    likes: Array<TCommon>;

    comments: Array<TCommon>;

    constructor(config: TMessage) {
        super();
        this.id = config.id || null;
        this.roomId = config.roomId || null;
        this.name = config.name || null;
        this.href = config.href || null;
        this.image = config.image || null;
        this.description = config.description || "";
        this.avatar = config.avatar || null;
        this.status = config.status || null;
        this.content = config.content || "";
        this.createdAt = new Date(config.createdAt || null);
        this.updatedAt = new Date(config.updatedAt || null);
        this.stars = config.stars || [];
        this.likes = config.likes || [];
        this.comments = config.comments || [];
    }

    getCount(type: TCountType): number {
        return this[type].length;
    }

    static createItem(config: TMessageField): TMessage {
        const filteredConfig = { ...config };
        delete filteredConfig.roomId;

        return {
            id: null,
            name: null,
            href: null,
            image: null,
            avatar: null,
            status: null,
            description: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            stars: [],
            likes: [],
            comments: [],
            roomId: config.roomId,
            ...filteredConfig,
        };
    }

    toExternal(): TMessage {
        return {
            ...this,
            roomId: this.roomId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
