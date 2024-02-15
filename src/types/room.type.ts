import IMessage from "@t/message.type";
import { TGeneralUser, TUser } from "@t/user.type";

export type TRoom = {
    id: string;
    title: string;
    description: string;
    type: string;
    starred: boolean;
    createdAt: Date;
    updatedAt: Date;
    users: TUser[];
    dialog: Array<IMessage>;
};

export type TRoomMenu = {
    key: string;
    label: string;
    id: string;
    title: string;
    description: string;
    type: string;
    starred: boolean;
    users: Array<TGeneralUser>;
    dialog: Array<IMessage>;
};

export type TRoomField = {
    id?: string;
    title: string;
    type: string;
    description: string;
    users?: Array<TUser>;
};

export type TRoomType = "public" | "direct";

export type TDirectRoom = TGeneralUser & {
    roomId: string;
    users: { id: string }[];
    unread: boolean;
    active: boolean;
};
export type TPublicRoom = TRoom & { unread: boolean };
