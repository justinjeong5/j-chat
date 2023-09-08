import BaseModel from "models/BaseModel";
import IDialog from "types/dialog.type";
import IRoom, { TRoomExternal, TRoomField, TRoomMenu } from "types/room.type";

export default class Room extends BaseModel implements IRoom {
    id: number;

    title: string;

    description: string;

    type: string;

    createdAt: Date;

    updatedAt: Date;

    users: Array<object>;

    dialogs: Array<object>;

    constructor(config: TRoomExternal) {
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

    toMenu(): TRoomMenu {
        return {
            key: String(this.id),
            label: this.title,
            ...this,
        };
    }

    setDialogs(dialogs: Array<IDialog>): IRoom {
        this.dialogs = dialogs;
        return { ...this };
    }

    toExternal(): TRoomExternal {
        const external = { ...this };
        delete external.toMenu;
        delete external.setDialogs;
        delete external.toExternal;

        return {
            ...this,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
        };
    }

    static toInternal(config: TRoomField): TRoomExternal {
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
