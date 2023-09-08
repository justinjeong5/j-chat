import BaseModel from "models/BaseModel";
import IMessage, { TCountType, TMessageExternal } from "types/message.type";

export default class Message extends BaseModel implements IMessage {
    id: number;

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

    stars: Array<object>;

    likes: Array<object>;

    comments: Array<object>;

    dialog: Array<IMessage>;

    constructor(config) {
        super();
        this.id = config.id || null;
        this.roomId = config.room_id || null;
        this.name = config.name || null;
        this.href = config.href || null;
        this.image = config.image || null;
        this.description = config.description || null;
        this.avatar = config.avatar || null;
        this.status = config.status || null;
        this.content = config.content || null;
        this.createdAt = new Date(config.created_at || null);
        this.updatedAt = new Date(config.updated_at || null);
        this.stars = config.stars || [];
        this.likes = config.likes || [];
        this.comments = config.comments || [];
        this.dialog = config.dialog || [];
    }

    getCount(type: TCountType): number {
        return this[type].length;
    }

    static toInternal(config: object) {
        return config;
    }

    toExternal(): TMessageExternal {
        return {
            ...this,
            room_id: this.roomId,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    }
}