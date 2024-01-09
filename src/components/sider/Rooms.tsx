import {
    CoffeeOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import useRooms from "@hooks/room/useRooms";
import Room from "@models/Room";
import IRoom, { TRoomMenu } from "@t/room.type";
import type { MenuProps } from "antd";
import { Menu, Skeleton } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({
    loading,
    rooms,
}: {
    loading: boolean;
    rooms: IRoom[];
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { composeRooms } = useRooms();

    const [items, setItems] = useState([] as TRoomMenu[]);

    const onClickRoom: MenuProps["onClick"] = e => {
        router.push(`/rooms/${e.key}`);
    };

    useEffect(() => {
        if (rooms) {
            setItems(composeRooms(rooms));
        }
    }, [rooms]);

    if (loading) {
        return (
            <Menu>
                {[
                    {
                        key: Room.PUBLIC,
                        label: "Public Rooms",
                        icon: <CoffeeOutlined />,
                    },
                    {
                        key: Room.STAR,
                        label: "Starred Rooms",
                        icon: <PushpinOutlined />,
                    },
                    {
                        key: Room.DIRECT,
                        label: "Direct Dialog",
                        icon: <UserOutlined />,
                    },
                ].map(({ key, label, icon }) => (
                    <Menu.SubMenu key={key} title={label} icon={icon}>
                        {Array.from({ length: 2 }).map(() => (
                            <Menu.Item key={uuidv4()}>
                                <Skeleton active paragraph={false} round />
                            </Menu.Item>
                        ))}
                    </Menu.SubMenu>
                ))}
            </Menu>
        );
    }

    return (
        <Menu
            defaultOpenKeys={[Room.PUBLIC, Room.STAR]}
            selectedKeys={[searchParams?.get("roomId") as string]}
            items={items as TRoomMenu[]}
            mode="inline"
            onClick={onClickRoom}
        />
    );
}
