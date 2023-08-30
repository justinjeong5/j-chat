import client from "lib/api";
import Room from "models/Room";

const useRooms = async () => {
    const { data } = await client.get("/rooms");
    const rooms = data.map(r => new Room(r));
    return {
        rooms,
    };
};

export default useRooms;
