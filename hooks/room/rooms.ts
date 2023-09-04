import client from "lib/api";
import Room from "models/Room";
import Rooms from "models/Rooms";

const useRooms = () => {
    const getRooms = async () => {
        const { data } = await client.get("/rooms");
        return new Rooms(data.map(r => new Room(r)));
    };

    const createRoom = async ({ title, type }) => {
        const { data } = await client.post(
            "/rooms",
            Room.createItem({ title, type }),
        );
        return data;
    };

    return {
        getRooms,
        createRoom,
    };
};

export default useRooms;
