import { TUser } from "types/user.type";

export type TMessage = {
    id: string;
    roomId: string;
    writer: TUser;
    content: string;
    image: string;

    stars: Array<object>;
    likes: Array<object>;
    comments: Array<object>;

    createdAt: Date;
    updatedAt: Date;
};

export default interface IMessage extends TMessage {
    getCount(type: string): number;
}

export type TCountType = "stars" | "likes" | "comments";

export type TMessageField = {
    roomId: string;
    content: string;
};
