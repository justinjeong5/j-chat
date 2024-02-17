"use client";

import Header from "@app/_component/Header";
import WithAuth from "@app/_hoc/WithAuth";
import { TUser } from "@t/user.type";
import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function AdminLayout({
    children,
    user,
}: {
    children: React.ReactNode;
    user: TUser;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const [title, setTitle] = useState<string>("");

    const items = useMemo(
        () =>
            [
                {
                    title: "전체 유저 현황",
                    label: "계정",
                    key: "/admin/users",
                },
                {
                    title: "전체 대화방 현황",
                    label: "대화방",
                    key: "/admin/rooms",
                },
            ].filter(Boolean) as {
                title: string;
                label: string;
                key: string;
            }[],
        [user.role],
    );

    useEffect(() => {
        if (user.role && !user.role.includes("admin")) {
            router.push("/");
        }
    }, [user.role]);

    useEffect(() => {
        const item = items.find(i => i.key === pathname);
        if (item) {
            setTitle(item.title);
        }
    }, [items, pathname]);

    return (
        <div>
            <Header title={title} />
            <Tabs
                activeKey={pathname as string}
                type="card"
                onTabClick={key => router.push(key)}
                items={items}
            />
            {children}
        </div>
    );
}

export default WithAuth(AdminLayout);
