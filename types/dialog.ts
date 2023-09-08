export type TDialog = {
    id: number;
    name: string;
    href: string;
    image: string;
    description: string;
    avatar: string;
    status: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    stars: Array<object>;
    likes: Array<object>;
    comments: Array<object>;
};

export default interface IDialog extends TDialog {
    getCount(type: string): number;
}

export type TCountType = "stars" | "likes" | "comments";
