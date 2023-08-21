import { getItem, MenuProps } from "hooks/menu/index";

const useRooms = () => {
    const rooms: MenuProps["items"] = [
        getItem("Public Rooms", {
            // children: [
            //     getItem("Item 1", {
            //         children: [getItem("Option 1"), getItem("Option 2")],
            //     }),
            //     getItem("Item 2", {
            //         children: [getItem("Option 3"), getItem("Option 4")],
            //     }),
            // ],
            children: [
                getItem("Option 1"),
                getItem("Option 2"),
                getItem("Option 3"),
            ],
        }),
        getItem("Starred Rooms", {
            children: [
                getItem("Option 4"),
                getItem("Option 5"),
                getItem("Option 6"),
            ],
        }),
        getItem(null, { type: "divider" }),
        getItem("Direct Messages", {
            children: [getItem("Option 7"), getItem("Option 8")],
        }),
    ];

    return {
        rooms,
    };
};

export default useRooms;
