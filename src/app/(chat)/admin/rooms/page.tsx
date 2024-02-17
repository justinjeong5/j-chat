"use client";

import Avatar from "@components/Avatar";
import useNotice from "@hooks/notice";
import RoomRepo from "@repos/Room";
import { TRoom } from "@t/room.type";
import type { TableProps } from "antd";
import { Table, Tag } from "antd";
import { useEffect, useState } from "react";

const columns: TableProps<TRoom>["columns"] = [
    {
        title: "이름",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "설명",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "참여자",
        dataIndex: "users",
        key: "users",
        render: users => (
            <div>
                <Avatar images={users?.map(({ avatar }) => avatar)} />
            </div>
        ),
    },
    {
        title: "대화수",
        dataIndex: "dialog",
        key: "dialog",
        render: dialog => <div>{dialog.length}</div>,
    },
    {
        title: "종류",
        dataIndex: "type",
        key: "type",
        render: type => {
            const color = type === "direct" ? "green" : "geekblue";
            return (
                <Tag color={color} key={type}>
                    {type.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: "생성일",
        dataIndex: "createdAt",
        key: "createdAt",
        render: text => <div>{new Date(text).toLocaleDateString()}</div>,
    },
    {
        title: "수정일",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: text => <div>{new Date(text).toLocaleDateString()}</div>,
    },
];

function AdminRoomsPage() {
    const { errorHandler, contextHolder } = useNotice();
    const [rooms, setRooms] = useState<TRoom[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const roomsData = await RoomRepo.getRooms();
                setRooms(roomsData.results);
            } catch (e) {
                errorHandler(e);
            }
        })();
    }, []);

    return (
        <>
            {contextHolder}
            <Table columns={columns} dataSource={rooms} />
        </>
    );
}

export default AdminRoomsPage;
