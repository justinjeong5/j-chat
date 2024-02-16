import Message from "@models/Message";
import BaseRepo from "@repos/BaseRepo";
import { TQuery } from "@t/common.type";
import { TMessage } from "@t/message.type";

class MessageRepo extends BaseRepo {
    async get(id: string, query?: TQuery): Promise<TMessage> {
        return this.client
            .get(this.buildUrl("get", query, { id }))
            .then(({ data }) => new Message(data));
    }

    async list(query?: TQuery): Promise<{ results: Array<TMessage> }> {
        return this.client
            .get(this.buildUrl("list", query))
            .then(({ data }) => ({ results: data.map(r => new Message(r)) }));
    }

    async create(message: TMessage, query?: TQuery): Promise<TMessage> {
        return this.client
            .post(this.buildUrl("create", query), message)
            .then(({ data }) => new Message(data));
    }

    async update(message: TMessage, query?: TQuery): Promise<TMessage> {
        return this.client
            .patch(this.buildUrl("update", query), message)
            .then(({ data }) => new Message(data));
    }

    async patch(message: TMessage, query?: object): Promise<TMessage> {
        return this.client
            .patch(this.buildUrl("patch", query), message)
            .then(({ data }) => data);
    }

    async getDialogFromRoom(roomId: string): Promise<Array<TMessage>> {
        const { results } = await this.list();
        return results.filter(r => String(r.roomId) === roomId);
    }
}

export default new MessageRepo("/dialog");
