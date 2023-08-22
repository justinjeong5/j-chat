export default class Dialog {
    id: number;

    name: string;

    href: string;

    description: string;

    avatar: string;

    status: string;

    content: string;

    created_at: string;

    updated_at: string;

    constructor(config) {
        this.id = config.id || null;
        this.name = config.name || null;
        this.href = config.href || null;
        this.description = config.description || null;
        this.avatar = config.avatar || null;
        this.status = config.status || null;
        this.content = config.content || null;
        this.created_at = config.created_at || null;
        this.updated_at = config.updated_at || null;
    }
}
