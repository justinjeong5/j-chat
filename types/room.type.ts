export type TRoom = {
    id: number;
    title: string;
    description: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    users: Array<object>;
    dialogs: Array<object>;
};

export default interface IRoom extends TRoom {
    toMenu(): TRoomMenu;
    setDialogs(dialogs: Array<object>): IRoom;
    toExternal(): TRoomExternal;
}

export type TRoomExternal = {
    id: number;
    title: string;
    description: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    users: Array<object>;
    dialogs: Array<object>;
};

export type TRoomMenu = {
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
};

export type TRoomField = {
    title: string;
    type: string;
    description: string;
};
