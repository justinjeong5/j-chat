import IRoom from "types/room";
import { TRoomType } from "types/rooms";

export default class Rooms {
    list: Array<IRoom>;

    constructor(list: Array<IRoom>) {
        this.list = list;
    }

    getTypeOf(type: TRoomType): Array<IRoom> {
        return this.list.filter(r => r.type === type);
    }

    addRoom(room: IRoom): Array<IRoom> {
        this.list.push(room);
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
