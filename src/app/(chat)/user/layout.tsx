"use client";

import Header from "@app/_component/Header";
import WithAuth from "@app/_hoc/WithAuth";
import { TUser } from "@t/user.type";
import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function UserLayout({
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
                user.role?.includes("admin") && {
                    title: "관리자 페이지",
                    label: "관리자",
                    key: "/user/admin",
                },
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
        [user.role],
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

export default WithAuth(UserLayout);
