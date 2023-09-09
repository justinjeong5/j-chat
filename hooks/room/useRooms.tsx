import {
    CoffeeOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import RoomsModel from "models/Rooms";

export default function useRooms() {
    const composeRooms = rooms => {
        return [
            {
                key: RoomsModel.PUBLIC,
                label: "Public Rooms",
                icon: <CoffeeOutlined />,
                children: rooms
                    .getTypeOf(RoomsModel.PUBLIC)
                    .map(r => r.toMenu()),
            },
            {
                key: RoomsModel.STAR,
                label: "Starred Rooms",
                icon: <PushpinOutlined />,
                children: rooms.getTypeOf(RoomsModel.STAR).map(r => r.toMenu()),
            },
            {
                key: RoomsModel.DIRECT,
                label: "Direct Dialog",
                icon: <UserOutlined />,
                children: rooms
                    .getTypeOf(RoomsModel.DIRECT)
                    .map(r => r.toMenu()),
            },
        ];
    };

    return {
        composeRooms,
    };
}
