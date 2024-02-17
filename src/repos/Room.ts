import { withQS } from "@lib/api";
import Room from "@models/Room";
import BaseRepo from "@repos/BaseRepo";
import { TQuery } from "@t/common.type";
import { TMessage } from "@t/message.type";
import { TRoom, TRoomField } from "@t/room.type";

class RoomRepo extends BaseRepo {
    async get(id: string, query?: TQuery): Promise<TRoom> {
        return this.client
            .get(this.buildUrl("get", query, { id }))
            .then(({ data }) => new Room(data));
    }

    async list(
        query?: TQuery,
    ): Promise<{ results: Array<TRoom>; hasMore: boolean }> {
        return this.client
            .get(this.buildUrl("list", query))
            .then(({ data }) => ({
                results: data.results.map(r => new Room(r)),
                hasMore: data.hasMore,
            }));
    }

    async create(room: TRoom, query?: TQuery): Promise<TRoom> {
        return this.client
            .post(this.buildUrl("create", query), room)
            .then(({ data }) => new Room(data));
    }

    async update(id: string, fields: object, query?: TQuery): Promise<TRoom> {
        return this.client
            .patch(this.buildUrl("update", query, { id }), fields)
            .then(({ data }) => new Room(data));
    }

    async patch(room: TRoom, query?: object): Promise<TRoom> {
        return this.client
            .patch(this.buildUrl("patch", query, room), room)
            .then(({ data }) => new Room(data));
    }

    async getRooms(
        query?: object,
    ): Promise<{ results: TRoom[]; hasMore: boolean }> {
        const { results, hasMore } = await this.list({
            pageSize: 10,
            ...query,
        });
        return { results, hasMore };
    }

    async createRoom(obj: TRoomField): Promise<TRoom> {
        return this.create(new Room(obj));
    }

    async joinRoom(roomId: string, userId: string): Promise<TRoom> {
        return this.client
            .post(`/${roomId}/users`, { users: [userId] })
            .then(({ data }) => new Room(data));
    }

    async leaveRoom(roomId: string, userId: string): Promise<TRoom> {
        return this.client
            .patch(withQS(`/${roomId}/users`, { $pull: true }), {
                users: userId,
            })
            .then(({ data }) => new Room(data));
    }

    async sendMessage(roomId: string, message: TMessage): Promise<TRoom> {
        return this.client
            .post(`/${roomId}/dialog`, message)
            .then(({ data }) => new Room(data));
    }
}

export default new RoomRepo("/room/rooms");
