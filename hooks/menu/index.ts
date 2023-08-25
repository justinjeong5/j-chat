import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = ({
    id,
    title = null,
    icon = null,
    children,
    type = "item",
}: {
    id: string;
    title?: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
    type?: "group" | "item" | "divider";
}): MenuItem => {
    return {
        key: id,
        label: title,
        icon,
        children,
        type,
    } as MenuItem;
};

export { getItem, MenuProps };
