import {
    CoffeeOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import RoomsModel from "models/Rooms";
import IRoom from "types/room.type";
import { TRoomType } from "types/rooms.type";

export default function useRooms() {
    const getTypeOf = (list: Array<IRoom>, type: TRoomType): Array<IRoom> => {
        if (type === RoomsModel.STAR) {
            return list.filter(r => !!r.starred);
        }
        return list.filter(r => !r.starred && r.type === type);
    };

    const composeRooms = rooms => {
        return [
            {
                key: RoomsModel.PUBLIC,
                label: "Public Rooms",
                icon: <CoffeeOutlined />,
                children: getTypeOf(rooms, RoomsModel.PUBLIC).map(r =>
                    r.toMenu(),
                ),
            },
            {
                key: RoomsModel.STAR,
                label: "Starred Rooms",
                icon: <PushpinOutlined />,
                children: getTypeOf(rooms, RoomsModel.STAR).map(r =>
                    r.toMenu(),
                ),
            },
            {
                key: RoomsModel.DIRECT,
                label: "Direct Dialog",
                icon: <UserOutlined />,
                children: getTypeOf(rooms, RoomsModel.DIRECT).map(r =>
                    r.toMenu(),
                ),
            },
        ];
    };

    return {
        composeRooms,
    };
}
