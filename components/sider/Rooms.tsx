import {
    CoffeeOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Skeleton } from "antd";
import useRooms from "hooks/room/useRooms";
import RoomsModel from "models/Rooms";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({ loading, rooms }) {
    const router = useRouter();
    const { composeRooms } = useRooms();

    const [items, setItems] = useState([]);

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
                        key: RoomsModel.PUBLIC,
                        label: "Public Rooms",
                        icon: <CoffeeOutlined />,
                        children: [],
                    },
                    {
                        key: RoomsModel.STAR,
                        label: "Starred Rooms",
                        icon: <PushpinOutlined />,
                        children: [],
                    },
                    {
                        key: RoomsModel.DIRECT,
                        label: "Direct Dialog",
                        icon: <UserOutlined />,
                        children: [],
                    },
                ].map(({ key, label, icon }) => {
                    return (
                        <>
                            <Menu.SubMenu key={key} title={label} icon={icon} />
                            {Array.from({ length: 2 }).map(() => (
                                <Menu.Item key={uuidv4()}>
                                    <Skeleton active paragraph={false} round />
                                </Menu.Item>
                            ))}
                        </>
                    );
                })}
            </Menu>
        );
    }

    return (
        <Menu
            defaultOpenKeys={[RoomsModel.PUBLIC, RoomsModel.STAR]}
            selectedKeys={[router.query.roomId as string]}
            items={items}
            mode="inline"
            onClick={onClickRoom}
        />
    );
}
