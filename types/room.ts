export interface IRoom {
    id: number;
    title: string;
    description: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    users: Array<object>;
    dialogs: Array<object>;
}

export interface IRoomExternal {
    id: number;
    title: string;
    description: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    users: Array<object>;
    dialogs: Array<object>;
}

export interface IRoomMenu {
    key: string;
    label: string;
    id: number;
    title: string;
    description: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    users: Array<object>;
    dialogs: Array<object>;
}
