import BaseModel from "models/BaseModel";
import { TCommon } from "types/common.type";
import IMessage, {
    TCountType,
    TMessageExternal,
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

    constructor(config: TMessageExternal) {
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
    }

    getCount(type: TCountType): number {
        return this[type].length;
    }

    static createItem(config: TMessageField): TMessageExternal {
        const filteredConfig = { ...config };
        delete filteredConfig.roomId;

        return {
            id: null,
            name: null,
            href: null,
            image: null,
            avatar: null,
            status: null,
            content: null,
            created_at: new Date(),
            updated_at: new Date(),
            stars: [],
            likes: [],
            comments: [],
            room_id: config.roomId,
            ...filteredConfig,
        };
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
