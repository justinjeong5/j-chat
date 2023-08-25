import { getItem } from "hooks/menu/index";
import client from "lib/api";
import Room from "models/Room";
import { v4 as uuidv4 } from "uuid";

const composeRooms = rooms => {
    return [
        getItem({
            id: uuidv4(),
            title: "Public Rooms",
            type: "group",
            children: rooms
                .filter(({ type }) => type === "public")
                .map(getItem),
        }),
        getItem({
            id: uuidv4(),
            title: "Starred Rooms",
            type: "group",
            children: rooms.filter(({ type }) => type === "star").map(getItem),
        }),
        getItem({
            id: uuidv4(),
            type: "divider",
        }),
        getItem({
            id: uuidv4(),
            title: "Direct Messages",
            type: "group",
            children: rooms
                .filter(({ type }) => type === "direct")
                .map(getItem),
        }),
    ];
};

const useRooms = async () => {
    const { data } = await client.get("/rooms");
    const rooms = composeRooms(data.map(r => new Room(r)));
    return {
        rooms,
    };
};

export default useRooms;
