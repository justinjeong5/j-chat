export default class Dialog {
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

    stars: number;

    likes: number;

    comments: number;

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
        this.stars = config.stars || null;
        this.likes = config.likes || null;
        this.comments = config.comments || null;
    }
}
