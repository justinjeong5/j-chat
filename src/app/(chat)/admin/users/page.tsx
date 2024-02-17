"use client";

import Avatar from "@components/Avatar";
import useNotice from "@hooks/notice";
import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { TUser } from "@t/user.type";
import type { TableProps } from "antd";
import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";

const columns: TableProps<TUser>["columns"] = [
    {
        title: "아바타",
        dataIndex: "avatar",
        key: "avatar",
        render: avatar => <Avatar images={[avatar]} />,
    },
    {
        title: "이름",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "이메일",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "계정 생성일",
        dataIndex: "createdAt",
        key: "createdAt",
        render: text => <div>{new Date(text).toLocaleDateString()}</div>,
    },
    {
        title: "최종 접속",
        dataIndex: "lastLogin",
        key: "lastLogin",
        render: text => <div>{new Date(text).toLocaleDateString()}</div>,
    },
    {
        title: "역할",
        key: "role",
        dataIndex: "role",
        render: (_, { role }) => {
            if (!role) return null;
            return (
                <>
                    {role.map(r => {
                        let color = r.length > 5 ? "geekblue" : "green";
                        if (r === "admin") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={r}>
                                {r.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            );
        },
    },
    {
        title: "활동",
        key: "action",
        render: () => (
            <Space size="middle">
                <button
                    className={cn("text-blue-600", "cursor-pointer")}
                    type="button"
                    // eslint-disable-next-line no-console
                    onClick={() => console.log("아직 구현되지 않았습니다.")}
                >
                    경고
                </button>
                <button
                    className={cn("text-red-600", "cursor-pointer")}
                    type="button"
                    // eslint-disable-next-line no-console
                    onClick={() => console.log("아직 구현되지 않았습니다.")}
                >
                    정지
                </button>
            </Space>
        ),
    },
];

function AdminUsersPage() {
    const { errorHandler, contextHolder } = useNotice();
    const [users, setUsers] = useState<TUser[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const usersData = await UserRepo.getUsers();
                setUsers(usersData.results);
            } catch (e) {
                errorHandler(e);
            }
        })();
    }, []);

    return (
        <>
            {contextHolder}
            <Table columns={columns} dataSource={users} />
        </>
    );
}

export default AdminUsersPage;
