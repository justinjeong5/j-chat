import { TMessage } from "@t/message.type";
import { TGeneralUser, TUser } from "@t/user.type";

export type TRoomId = string;

export type TRoom = {
    id: TRoomId;
    title: string;
    description: string;
    type: string;
    starred: boolean;
    createdAt: Date;
    updatedAt: Date;
    users: TUser[];
    dialog: Array<TMessage>;
};

export type TRoomMenu = {
    key: string;
    label: string;
    id: TRoomId;
    title: string;
    description: string;
    type: string;
    starred: boolean;
    users: Array<TGeneralUser>;
    dialog: Array<TMessage>;
};

export type TRoomField = {
    id?: TRoomId;
    title: string;
    type: string;
    description: string;
    users?: Array<TGeneralUser>;
};

export type TRoomType = "public" | "direct";

export type TDirectRoom = TGeneralUser & {
    roomId: TRoomId;
    users: TGeneralUser[];
    unread: boolean;
    active: boolean;
};
export type TPublicRoom = TRoom & { unread: boolean };
