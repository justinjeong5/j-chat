import { UserOutlined } from "@ant-design/icons";
import MenuFrame from "@app/_component/menu/MenuFrame";
import MenuItem from "@app/_component/menu/MenuItem";
import Skeleton from "@components/Skeleton";
import { cn } from "@lib/utils";
import { subscribeUserLogin, subscribeUserLogout } from "@socket/user";
import { TGeneralUser } from "@t/user.type";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({
    loading,
    rooms,
    children,
}: {
    loading: boolean;
    rooms: TGeneralUser[];
    children?: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [directRooms, setDirectRooms] = useState<TGeneralUser[]>(rooms);

    useEffect(() => {
        setDirectRooms(rooms);
    }, [rooms]);

    useEffect(() => {
        subscribeUserLogin(id => {
            setDirectRooms(prev =>
                prev.map(r => ({
                    ...r,
                    active: r.id === id,
                })),
            );
        });
        subscribeUserLogout(id => {
            setDirectRooms(prev =>
                prev.map(r => ({
                    ...r,
                    active: r.id === id,
                })),
            );
        });
    }, []);

    return (
        <MenuFrame label="Direct Messages" icon={<UserOutlined />}>
            {loading
                ? Array.from({ length: 3 }).map(() => (
                      <Skeleton
                          key={uuidv4()}
                          className={cn("h-5", "w-full", "cursor-pointer")}
                      />
                  ))
                : directRooms.map(r => (
                      <MenuItem
                          key={uuidv4()}
                          title={r.username as string}
                          images={[r.avatar || ""].filter(Boolean)}
                          selected={pathname === `/rooms/${r.id}`}
                          type="direct"
                          active={r.active}
                          onClick={() => {
                              router.push(`/rooms/${r.id}`);
                          }}
                      />
                  ))}
            {children}
        </MenuFrame>
    );
}
