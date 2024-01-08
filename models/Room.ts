import BaseModel from "@models/BaseModel";
import IMessage from "@t/message.type";
import IRoom, { TRoom, TRoomField, TRoomMenu, TRoomType } from "@t/room.type";

export default class Room extends BaseModel implements IRoom {
    id: string;

    title: string;

    description: string;

    type: string;

    starred: boolean;

    createdAt: Date;

    updatedAt: Date;

    users: Array<object>;

    dialog: Array<IMessage>;

    constructor(config: TRoom) {
        super();
        this.id = config.id || null;
        this.title = config.title || null;
        this.description = config.description || null;
        this.type = config.type || null;
        this.starred = !!config.starred || null;
        this.createdAt = new Date(config.createdAt);
        this.updatedAt = new Date(config.updatedAt);
        this.users = config.users || [];
        this.dialog = config.dialog || [];
    }

    toMenu(): TRoomMenu {
        return {
            key: String(this.id),
            label: this.title,
            id: this.id,
            title: this.title,
            description: this.description,
            type: this.type,
            starred: this.starred,
            users: this.users,
            dialog: this.dialog,
        };
    }

    setDialog(dialog: Array<IMessage>): IRoom {
        this.dialog = dialog;
        return this;
    }

    addMessage(message: IMessage): IRoom {
        return this.setDialog(this.dialog.concat(message));
    }

    toggleStarred() {
        this.starred = !this.starred;
        return this;
    }

    toExternal(): TRoom {
        const external = { ...this };
        delete external.toMenu;
        delete external.setDialog;
        delete external.toExternal;
        delete external.addMessage;

        return {
            ...this,
            id: String(this.id),
            dialog: this.dialog.map(m => String(m.id)),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    static createItem(config: TRoomField): TRoom {
        return {
            id: null,
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

    static get STAR(): TRoomType {
        return "star";
    }

    static get DIRECT(): TRoomType {
        return "direct";
    }
}
