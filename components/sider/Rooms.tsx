import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Skeleton } from "antd";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({ title, icon, loading, rooms }) {
    const router = useRouter();
    const onClickRoom: MenuProps["onClick"] = e => {
        router.push(`/rooms/${e.key}`);
    };

    if (loading) {
        return (
            <Menu>
                <Menu.SubMenu title={title} icon={icon} />
                {Array.from({ length: 2 }).map(() => (
                    <Menu.Item key={uuidv4()}>
                        <Skeleton active paragraph={false} round />
                    </Menu.Item>
                ))}
            </Menu>
        );
    }

    const roomKey = uuidv4();
    return (
        <Menu
            defaultOpenKeys={[roomKey]}
            selectedKeys={[]}
            items={[
                {
                    key: roomKey,
                    label: title,
                    icon,
                    children: rooms.map(r => r.toMenu()),
                },
            ]}
            mode="inline"
            onClick={onClickRoom}
        />
    );
}

Rooms.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    loading: PropTypes.bool.isRequired,
    rooms: PropTypes.arrayOf(
        PropTypes.shape({ key: PropTypes.string, label: PropTypes.string }),
    ).isRequired,
};

Rooms.defaultProps = {
    icon: <HomeOutlined />,
};
