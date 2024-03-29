"use client";

import Header from "@app/_component/Header";
import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const [title, setTitle] = useState<string>("");

    const items = useMemo(
        () =>
            [
                {
                    title: "회원 정보",
                    label: "회원 정보",
                    key: "/user/detail",
                },
                {
                    title: "회원 정보 수정",
                    label: "정보 수정",
                    key: "/user/edit",
                },
                {
                    title: "참여 내역",
                    label: "참여 내역",
                    key: "/user/history",
                },
            ].filter(Boolean) as {
                title: string;
                label: string;
                key: string;
            }[],
        [],
    );

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

export default UserLayout;
