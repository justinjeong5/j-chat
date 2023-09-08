/* eslint-disable class-methods-use-this */
import client from "lib/api";
import Room from "models/Room";
import Rooms from "models/Rooms";
import BaseRepo from "repos/BaseRepo";
import DialogRepo from "repos/Dialog";
import IRoom, { TRoomField } from "types/room";
import IRooms from "types/rooms";

class RoomRepo extends BaseRepo {
    async getRooms(): Promise<IRooms> {
        const { data } = await client.get("/rooms");
        return new Rooms(data.map(r => new Room(r)));
    }

    async getRoomWithDialogs(id: string): Promise<IRoom> {
        const [roomData, dialogData] = await Promise.all([
            this.get(id),
            DialogRepo.getDialogsFromRoom(id),
        ]);
        return new Room(roomData.data).setDialogs(dialogData);
    }

    async createRoom({ title, type, description }: TRoomField): Promise<IRoom> {
        const room = new Room(Room.toInternal({ title, type, description }));
        const { data } = await this.create(room.toExternal());
        return new Room(data);
    }
}

export default new RoomRepo("/rooms");
