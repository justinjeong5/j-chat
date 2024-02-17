"use client";

import { TUser } from "@t/user.type";
import { Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";

export default function UserLayout({
    children,
    user,
}: {
    children: React.ReactNode;
    user: TUser;
}) {
    const pathname = usePathname();
    const router = useRouter();

    console.log("user", user);

    return (
        <div>
            <Tabs
                activeKey={pathname as string}
                type="card"
                onTabClick={key => router.push(key)}
                items={[
                    {
                        label: "회원 정보",
                        key: "/user/detail",
                    },
                    {
                        label: "정보 수정",
                        key: "/user/edit",
                    },
                    {
                        label: "참여 내역",
                        key: "/user/history",
                    },
                ]}
            />
            {children}
        </div>
    );
}
