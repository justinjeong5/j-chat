import IRoom from "@t/room.type";

export type TRooms = {
    list: Array<IRoom>;
};
export default interface IRooms extends TRooms {
    getTypeOf(type: string): Array<IRoom>;
    addRoom(room: IRoom): Array<IRoom>;
    isEmpty(): boolean;
}

export type TRoomType = "public" | "direct";
