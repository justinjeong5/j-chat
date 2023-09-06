import Room from "models/Room";

export default class Rooms {
    list: Array<Room>;

    constructor(list: Array<Room>) {
        this.list = list;
    }

    getTypeOf(type: string): Array<Room> {
        return this.list.filter(r => r.type === type);
    }

    addRoom(room: Room): Array<Room> {
        this.list.push(room);
        return this.list;
    }

    isEmpty() {
        return this.list.length === 0;
    }

    static get PUBLIC() {
        return "public";
    }

    static get STAR() {
        return "star";
    }

    static get DIRECT() {
        return "direct";
    }
}
