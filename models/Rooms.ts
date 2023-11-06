import RoomsModel from "models/Rooms";
import IRoom from "types/room.type";
import { TRoomType } from "types/rooms.type";

export default class Rooms {
    list: Array<IRoom>;

    constructor(list: Array<IRoom>) {
        this.list = list;
    }

    getTypeOf(type: TRoomType): Array<IRoom> {
        if (type === RoomsModel.STAR) {
            return this.list.filter(r => !!r.starred);
        }
        return this.list.filter(r => !r.starred && r.type === type);
    }

    addRoom(room: IRoom): Array<IRoom> {
        this.list.push(room);
        return this.list;
    }

    addRooms(rooms: IRoom[]): Array<IRoom> {
        this.list = this.list.concat(rooms);
        return this.list;
    }

    isEmpty(): boolean {
        return !this.list.length;
    }

    static get PUBLIC(): TRoomType {
        return "public";
    }

    static get STAR(): TRoomType {
        return "star";
    }

    static get DIRECT(): TRoomType {
        return "direct";
    }
}
