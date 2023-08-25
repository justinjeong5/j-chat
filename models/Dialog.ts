import IDialog from "models/Dialog.type";

export default class Dialog implements IDialog {
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

    constructor(config) {
        this.id = config.id || null;
        this.name = config.name || null;
        this.href = config.href || null;
        this.image = config.image || null;
        this.description = config.description || null;
        this.avatar = config.avatar || null;
        this.status = config.status || null;
        this.content = config.content || null;
        this.created_at = new Date(config.created_at || null);
        this.updated_at = new Date(config.updated_at || null);
        this.stars = config.stars || [];
        this.likes = config.likes || [];
        this.comments = config.comments || [];
    }
}
