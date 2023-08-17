import { MenuProps, getItem } from "lib/menu/index";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const useRooms = () => {
  const rooms: MenuProps["items"] = [
    getItem("Navigation One", {
      icon: <MailOutlined />,
      children: [
        getItem("Item 1", {
          children: [getItem("Option 1"), getItem("Option 2")],
        }),
        getItem("Item 2", {
          children: [getItem("Option 3"), getItem("Option 4")],
        }),
      ],
    }),
    getItem("Navigation Two", {
      icon: <AppstoreOutlined />,
      children: [getItem("Option 5"), getItem("Option 6")],
    }),
    getItem(null, { type: "divider" }),
    getItem("Navigation Three", {
      icon: <SettingOutlined />,
      children: [
        getItem("Option 9"),
        getItem("Option 10"),
        getItem("Option 11"),
        getItem("Option 12"),
      ],
    }),
    getItem("Group", {
      children: [getItem("Option 13"), getItem("Option 14")],
    }),
  ];

  return {
    rooms,
  };
};

export default useRooms;
