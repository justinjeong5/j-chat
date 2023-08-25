export default interface IDialog {
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
}
