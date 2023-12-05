import {
    CoffeeOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import Room from "models/Room";
import IRoom from "types/room.type";
import { TRoomType } from "types/rooms.type";

export default function useRooms() {
    const getTypeOf = (list: Array<IRoom>, type: TRoomType): Array<IRoom> => {
        if (type === Room.STAR) {
            return list.filter(r => !!r.starred);
        }
        return list.filter(r => !r.starred && r.type === type);
    };

    const composeRooms = rooms => {
        return [
            {
                key: Room.PUBLIC,
                label: "Public Rooms",
                icon: <CoffeeOutlined />,
                children: getTypeOf(rooms, Room.PUBLIC).map(r => r.toMenu()),
            },
            {
                key: Room.STAR,
                label: "Starred Rooms",
                icon: <PushpinOutlined />,
                children: getTypeOf(rooms, Room.STAR).map(r => r.toMenu()),
            },
            {
                key: Room.DIRECT,
                label: "Direct Dialog",
                icon: <UserOutlined />,
                children: getTypeOf(rooms, Room.DIRECT).map(r => r.toMenu()),
            },
        ];
    };

    return {
        composeRooms,
    };
}
