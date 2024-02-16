import { UserOutlined } from "@ant-design/icons";
import MenuFrame from "@app/_component/menu/MenuFrame";
import MenuItem from "@app/_component/menu/MenuItem";
import Skeleton from "@components/Skeleton";
import { cn } from "@lib/utils";
import RoomModel from "@models/Room";
import { subscribeRoomPosted } from "@socket/room";
import { subscribeUserLogin, subscribeUserLogout } from "@socket/user";
import { TDirectRoom, TRoom } from "@t/room.type";
import { TUserId } from "@t/user.type";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function DirectRooms({
    loading,
    rooms,
    children,
}: {
    loading: boolean;
    rooms: TDirectRoom[];
    children?: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [directRooms, setDirectRooms] = useState<TDirectRoom[]>(rooms);

    useEffect(() => {
        setDirectRooms(rooms);
    }, [rooms]);

    useEffect(() => {
        setDirectRooms((prev: TDirectRoom[]): TDirectRoom[] => {
            return prev.map((r: TDirectRoom) => {
                if (pathname.includes(r.roomId)) {
                    return { ...r, unread: false };
                }
                return r;
            });
        });
    }, [pathname]);

    useEffect(() => {
        subscribeRoomPosted((room: TRoom) => {
            if (
                room.type === RoomModel.DIRECT &&
                !pathname.includes(room.id) &&
                directRooms.find(r => r.roomId === room.id)
            ) {
                setDirectRooms((prev: TDirectRoom[]): TDirectRoom[] =>
                    prev.map((r: TDirectRoom) => {
                        if (r.roomId === room.id) {
                            return { ...r, unread: true };
                        }
                        return r;
                    }),
                );
            }
        });
    }, [directRooms, pathname]);

    useEffect(() => {
        subscribeUserLogin((id: TUserId) => {
            setDirectRooms((prev: TDirectRoom[]): TDirectRoom[] =>
                prev.map((r: TDirectRoom) => {
                    if (r.id === id) {
                        return {
                            ...r,
                            active: true,
                        };
                    }
                    return r;
                }),
            );
        });
        subscribeUserLogout((id: TUserId) => {
            setDirectRooms((prev: TDirectRoom[]): TDirectRoom[] =>
                prev.map((r: TDirectRoom) => {
                    if (r.id === id) {
                        return {
                            ...r,
                            active: false,
                        };
                    }
                    return r;
                }),
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
                : directRooms.map((r: TDirectRoom) => (
                      <MenuItem
                          key={uuidv4()}
                          title={r.username as string}
                          images={[r.avatar as string]}
                          selected={pathname.includes(r.roomId)}
                          type={RoomModel.DIRECT}
                          unread={r.unread}
                          active={r.active}
                          onClick={() => {
                              router.push(`/rooms/${r.roomId}`);
                          }}
                      />
                  ))}
            {children}
        </MenuFrame>
    );
}
