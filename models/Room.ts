interface IRoom {
    id: number;
    title: string;
    description: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    users: Array<object>;
    dialogs: Array<object>;
}

interface IRoomMenu {
    key: string;
    label: string;
    id: number;
    title: string;
    description: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    users: Array<object>;
    dialogs: Array<object>;
}

export default class Room {
    id: number;

    title: string;

    description: string;

    type: string;

    created_at: Date;

    updated_at: Date;

    users: Array<object>;

    dialogs: Array<object>;

    constructor(config: IRoom) {
        this.id = config.id || null;
        this.title = config.title || null;
        this.description = config.description || null;
        this.type = config.type || null;
        this.created_at = new Date(config.created_at || null);
        this.updated_at = new Date(config.updated_at || null);
        this.users = config.users || [];
        this.dialogs = config.dialogs || [];
    }

    toMenu(): IRoomMenu {
        return {
            key: String(this.id),
            label: this.title,
            ...this,
        };
    }

    static createItem(config: {
        title: string;
        type: string;
        description: string;
    }) {
        return {
            users: [],
            dialogs: [],
            ...config,
        };
    }
}
