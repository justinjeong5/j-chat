import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { emitUserLogout } from "@socket/user";
import { TUser } from "@t/user.type";
import { Avatar, Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Profile({ user }: { user: TUser }) {
    const router = useRouter();

    const handleAdminRoute = useCallback(() => {
        router.push("/admin/users");
    }, []);

    const handleUserInfoRoute = useCallback(() => {
        router.push("/user/detail");
    }, []);

    const handleLogout = useCallback(() => {
        emitUserLogout(user);
        UserRepo.logout();
        router.replace("/login");
    }, [user]);

    return (
        <div>
            <div className={cn("flex", "items-center", "mb-2", "gap-4")}>
                <Avatar src={user.avatar} />
                <div>{user.username}</div>
            </div>
            <div>{user.email}</div>
            <Space className={cn("flex", "justify-end", "mt-4")}>
                <Space>
                    {user.role?.includes("admin") && (
                        <Button
                            className={cn("bg-[#1677FF]")}
                            type="primary"
                            onClick={handleAdminRoute}
                        >
                            관리자
                        </Button>
                    )}
                    <Button
                        className={cn("bg-[#1677FF]")}
                        type="primary"
                        onClick={handleUserInfoRoute}
                    >
                        계정 관리
                    </Button>
                    <Button type="dashed" onClick={handleLogout}>
                        로그아웃
                    </Button>
                </Space>
            </Space>
        </div>
    );
}
