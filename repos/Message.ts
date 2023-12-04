import Message from "models/Message";
import BaseRepo from "repos/BaseRepo";
import { TQuery } from "types/common.type";
import IMessage, { TMessage } from "types/message.type";

class MessageRepo extends BaseRepo {
    async get(id: string, query?: TQuery): Promise<IMessage> {
        return this.client
            .get(this.buildUrl("get", query, { id }))
            .then(({ data }) => new Message(data));
    }

    async list(query?: TQuery): Promise<{ results: Array<IMessage> }> {
        return this.client
            .get(this.buildUrl("list", query))
            .then(({ data }) => ({ results: data.map(r => new Message(r)) }));
    }

    async create(message: TMessage, query?: TQuery): Promise<IMessage> {
        return this.client
            .post(this.buildUrl("create", query), message)
            .then(({ data }) => new Message(data));
    }

    async update(message: TMessage, query?: TQuery): Promise<IMessage> {
        return this.client
            .patch(this.buildUrl("update", query), message)
            .then(({ data }) => new Message(data));
    }

    async patch(message: TMessage, query?: object): Promise<IMessage> {
        return this.client
            .patch(this.buildUrl("patch", query), message)
            .then(({ data }) => data);
    }

    async getDialogFromRoom(roomId: string): Promise<Array<IMessage>> {
        const { results } = await this.list();
        return results.filter(r => String(r.roomId) === roomId);
    }
}

export default new MessageRepo("/dialog");
