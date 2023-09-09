import BaseModel from "models/BaseModel";
import IMessage from "types/message.type";
import IRoom, { TRoomExternal, TRoomField, TRoomMenu } from "types/room.type";

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

    constructor(config: TRoomExternal) {
        super();
        this.id = config.id || null;
        this.title = config.title || null;
        this.description = config.description || null;
        this.type = config.type || null;
        this.starred = !!config.starred || null;
        this.createdAt = new Date(config.created_at);
        this.updatedAt = new Date(config.updated_at);
        this.users = config.users || [];
        this.dialog = config.dialog || [];
    }

    toMenu(): TRoomMenu {
        return {
            key: String(this.id),
            label: this.title,
            ...this,
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

    toExternal(): TRoomExternal {
        const external = { ...this };
        delete external.toMenu;
        delete external.setDialog;
        delete external.toExternal;
        delete external.addMessage;

        return {
            ...this,
            id: String(this.id),
            dialog: this.dialog.map(m => String(m.id)),
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    }

    static createItem(config: TRoomField): TRoomExternal {
        return {
            id: null,
            users: [],
            dialog: [],
            starred: false,
            created_at: new Date(),
            updated_at: new Date(),
            ...config,
        };
    }
}
