import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { Avatar, Button, Space } from "antd";
import { useRouter } from "next/navigation";

export default function Profile({ user }) {
    const router = useRouter();

    const handleUserInformation = () => {
        router.push("/user/detail");
    };
    const handleLogout = () => {
        UserRepo.logout();
        router.replace("/login");
    };

    return (
        <div>
            <div className={cn("flex", "items-center", "mb-2", "gap-4")}>
                <Avatar src={user.avatar} />
                <div>{user.username}</div>
            </div>
            <div>{user.email}</div>
            <Space className={cn("flex", "justify-end", "mt-4")}>
                <Space>
                    <Button
                        className={cn("bg-[#1677FF]")}
                        type="primary"
                        onClick={handleUserInformation}
                    >
                        사용자 관리
                    </Button>
                    <Button
                        className={cn("bg-[#1677FF]")}
                        type="primary"
                        onClick={handleLogout}
                    >
                        로그아웃
                    </Button>
                </Space>
            </Space>
        </div>
    );
}
