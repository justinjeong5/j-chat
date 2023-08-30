import type { MenuProps } from "antd";
import { Menu, Skeleton } from "antd";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({ loading, rooms }) {
    // rooms를 추가로 가공하지 않고 바로 사용가능하도록 전달받기
    console.log(rooms);
    const router = useRouter();
    const onClickRoom: MenuProps["onClick"] = e => {
        router.push(`/rooms/${e.key}`);
    };

    if (loading) {
        return (
            <Menu>
                {Object.keys(rooms).map(k => {
                    const { label, icon } = rooms[k];
                    return (
                        <>
                            <Menu.SubMenu title={label} icon={icon} />
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
            defaultOpenKeys={["public", "star", "direct"]}
            items={[]}
            mode="inline"
            onClick={onClickRoom}
        />
    );
}

Rooms.propTypes = {
    loading: PropTypes.bool.isRequired,
    rooms: PropTypes.shape({
        public: PropTypes.shape({
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
        star: PropTypes.shape({
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
        direct: PropTypes.shape({
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
    }).isRequired,
};
