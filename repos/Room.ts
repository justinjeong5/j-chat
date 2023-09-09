import Room from "models/Room";
import Rooms from "models/Rooms";
import BaseRepo from "repos/BaseRepo";
import MessageRepo from "repos/Message";
import { TQuery } from "types/common.type";
import { TMessageExternal } from "types/message.type";
import IRoom, { TRoomExternal, TRoomField } from "types/room.type";
import IRooms from "types/rooms.type";

class RoomRepo extends BaseRepo {
    async get(id: string, query?: TQuery): Promise<IRoom> {
        return this.client
            .get(this.buildUrl("get", query, { id }))
            .then(({ data }) => new Room(data));
    }

    async list(query?: TQuery): Promise<{ results: Array<IRoom> }> {
        return this.client
            .get(this.buildUrl("list", query))
            .then(({ data }) => ({ results: data.map(r => new Room(r)) }));
    }

    async create(room: TRoomExternal, query?: TQuery): Promise<IRoom> {
        return this.client
            .post(this.buildUrl("create", query), room)
            .then(({ data }) => new Room(data));
    }

    async update(room: TRoomExternal, query?: TQuery): Promise<IRoom> {
        return this.client
            .patch(this.buildUrl("update", query, room), room)
            .then(({ data }) => new Room(data));
    }

    async patch(room: TRoomExternal, query?: object): Promise<IRoom> {
        return this.client
            .patch(this.buildUrl("patch", query, room), room)
            .then(({ data }) => new Room(data));
    }

    async getRooms(): Promise<IRooms> {
        const { results } = await this.list();
        return new Rooms(results);
    }

    async getRoomWithDialog(id: string): Promise<IRoom> {
        const [roomData, messageData] = await Promise.all([
            this.get(id),
            MessageRepo.getDialogFromRoom(id),
        ]);
        return roomData.setDialog(messageData);
    }

    async createRoom({ title, type, description }: TRoomField): Promise<IRoom> {
        return this.create(Room.createItem({ title, type, description }));
    }

    async addMessage(room: IRoom, message: TMessageExternal): Promise<IRoom> {
        const messageData = await MessageRepo.create(message);
        await this.patch(room.addMessage(messageData).toExternal());
        return this.getRoomWithDialog(room.id);
    }
}

export default new RoomRepo("/rooms");
