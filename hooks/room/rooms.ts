import client from "lib/api";
import Room from "models/Room";

const useRooms = async () => {
    const { data } = await client.get("/rooms");
    const rooms = data.map(r => new Room(r));
    return {
        rooms: {
            public: rooms.filter(({ type }) => type === "public"),
            star: rooms.filter(({ type }) => type === "star"),
            direct: rooms.filter(({ type }) => type === "direct"),
        },
    };
};

export default useRooms;
