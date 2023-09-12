export type TMessage = {
    id: string;
    roomId: string;
    name: string;
    href: string;
    image: string;
    description: string;
    avatar: string;
    status: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    stars: Array<object>;
    likes: Array<object>;
    comments: Array<object>;
};

export default interface IMessage extends TMessage {
    getCount(type: string): number;
}

export type TCountType = "stars" | "likes" | "comments";

export type TMessageField = {
    roomId: string;
    content: string;
};
