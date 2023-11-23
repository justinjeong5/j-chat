import { withQS } from "lib/api";
import Room from "models/Room";
import BaseRepo from "repos/BaseRepo";
import MessageRepo from "repos/Message";
import { TQuery } from "types/common.type";
import { TMessage } from "types/message.type";
import IRoom, { TRoom, TRoomField } from "types/room.type";

class RoomRepo extends BaseRepo {
    async get(id: string, query?: TQuery): Promise<IRoom> {
        return this.client
            .get(this.buildUrl("get", query, { id }))
            .then(({ data }) => new Room(data));
    }

    async list(
        query?: TQuery,
    ): Promise<{ results: Array<IRoom>; hasMore: boolean }> {
        return this.client
            .get(this.buildUrl("list", query))
            .then(({ data }) => ({
                results: data.results.map(r => new Room(r)),
                hasMore: data.hasMore,
            }));
    }

    async create(room: TRoom, query?: TQuery): Promise<IRoom> {
        return this.client
            .post(this.buildUrl("create", query), room)
            .then(({ data }) => new Room(data));
    }

    async update(id: string, fields: object, query?: TQuery): Promise<IRoom> {
        return this.client
            .patch(this.buildUrl("update", query, { id }), fields)
            .then(({ data }) => new Room(data));
    }

    async patch(room: TRoom, query?: object): Promise<IRoom> {
        return this.client
            .patch(this.buildUrl("patch", query, room), room)
            .then(({ data }) => new Room(data));
    }

    async getRooms(
        query?: object,
    ): Promise<{ results: IRoom[]; hasMore: boolean }> {
        const { results, hasMore } = await this.list({
            pageSize: 10,
            ...query,
        });
        return { results, hasMore };
    }

    async getRoomWithDialog(id: string): Promise<IRoom> {
        const [roomData, dialog] = await Promise.all([
            this.get(id),
            MessageRepo.getDialogFromRoom(id),
        ]);

        return roomData.setDialog(dialog);
    }

    async createRoom({ title, type, description }: TRoomField): Promise<IRoom> {
        return this.create(Room.createItem({ title, type, description }));
    }

    async joinRoom(roomId, userId): Promise<IRoom> {
        return this.client
            .post(`/room/rooms/${roomId}/users`, { users: [userId] })
            .then(({ data }) => new Room(data));
    }

    async leaveRoom(roomId, userId): Promise<IRoom> {
        return this.client
            .patch(withQS(`/room/rooms/${roomId}/users`, { $pull: true }), {
                users: userId,
            })
            .then(({ data }) => new Room(data));
    }

    async sendMessage(roomId: string, message: TMessage): Promise<IRoom> {
        return this.client
            .post(`/room/rooms/${roomId}/dialog`, message)
            .then(({ data }) => new Room(data));
    }

    async toggleStarred(roomId: string): Promise<IRoom> {
        const roomData = await this.getRoomWithDialog(roomId);
        await this.patch(roomData.toggleStarred().toExternal());
        return this.getRoomWithDialog(roomId);
    }
}

export default new RoomRepo("/room/rooms");
