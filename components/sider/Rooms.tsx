import {
    CoffeeOutlined,
    PushpinOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Skeleton } from "antd";
import RoomsModel from "models/Rooms";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({ loading, rooms }) {
    const router = useRouter();
    const onClickRoom: MenuProps["onClick"] = e => {
        router.push(`/rooms/${e.key}`);
    };

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
            items={rooms}
            mode="inline"
            onClick={onClickRoom}
        />
    );
}

Rooms.propTypes = {
    loading: PropTypes.bool,
    rooms: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            label: PropTypes.string,
            icon: PropTypes.node,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                }),
            ).isRequired,
        }).isRequired,
    ).isRequired,
};

Rooms.defaultProps = {
    loading: false,
};
