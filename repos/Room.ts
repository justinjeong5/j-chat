import Message from "models/Message";
import Room from "models/Room";
import Rooms from "models/Rooms";
import BaseRepo from "repos/BaseRepo";
import MessageRepo from "repos/Message";
import { TQuery } from "types/common.type";
import IMessage from "types/message.type";
import IRoom, { TRoom, TRoomField } from "types/room.type";
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

    async create(message: TRoom, query?: TQuery): Promise<IRoom> {
        return this.client
            .post(this.buildUrl("create", query), message)
            .then(({ data }) => new Room(data));
    }

    async update(message: TRoom, query?: TQuery): Promise<IRoom> {
        return this.client
            .patch(this.buildUrl("update", query), message)
            .then(({ data }) => new Room(data));
    }

    async patch(message: TRoom, query?: object): Promise<any> {
        return this.client
            .patch(this.buildUrl("patch", query), message)
            .then(({ data }) => data);
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
        const room = new Room(Room.toInternal({ title, type, description }));
        return this.create(room);
    }

    async addMessage(roomId: string, message: string): Promise<IMessage> {
        const roomData = await this.get(roomId);
        const messageData = await MessageRepo.create(new Message(message));
        const roomData2 = await this.patch(roomData.addMessage(messageData));
        return roomData2;
    }
}

export default new RoomRepo("/rooms");
