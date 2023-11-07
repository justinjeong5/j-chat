import IMessage from "types/message.type";

export type TRoom = {
    id: string;
    title: string;
    description: string;
    type: string;
    starred: boolean;
    createdAt: Date;
    updatedAt: Date;
    users: Array<object>;
    dialog: Array<IMessage>;
};

export default interface IRoom extends TRoom {
    toMenu(): TRoomMenu;
    setDialog(dialog: Array<IMessage>): IRoom;
    addMessage(message: IMessage): IRoom;
    toggleStarred(): IRoom;
    toExternal(): TRoom;
}

export type TRoomMenu = {
    key: string;
    label: string;
    id: string;
    title: string;
    description: string;
    type: string;
    starred: boolean;
    createdAt: Date;
    updatedAt: Date;
    users: Array<object>;
    dialog: Array<IMessage>;
};

export type TRoomField = {
    title: string;
    type: string;
    description: string;
};

export type TRoomType = "public" | "star" | "direct";
