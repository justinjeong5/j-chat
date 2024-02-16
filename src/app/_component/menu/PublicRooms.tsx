import { CoffeeOutlined } from "@ant-design/icons";
import MenuFrame from "@app/_component/menu/MenuFrame";
import MenuItem from "@app/_component/menu/MenuItem";
import Skeleton from "@components/Skeleton";
import { cn } from "@lib/utils";
import RoomModel from "@models/Room";
import { subscribeRoomPosted } from "@socket/room";
import { TPublicRoom } from "@t/room.type";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PublicRooms({
    loading,
    rooms,
    children,
}: {
    loading: boolean;
    rooms: TPublicRoom[];
    children?: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [publicRooms, setPublicRooms] = useState(rooms);

    useEffect(() => {
        setPublicRooms(rooms);
    }, [rooms]);

    useEffect(() => {
        setPublicRooms((prev: TPublicRoom[]): TPublicRoom[] => {
            return prev.map((r: TPublicRoom) => {
                if (pathname.includes(r.id)) {
                    return { ...r, unread: false };
                }
                return r;
            });
        });
    }, [pathname]);

    useEffect(() => {
        subscribeRoomPosted(room => {
            if (
                room.type === RoomModel.PUBLIC &&
                !pathname.includes(room.id) &&
                publicRooms.find(r => r.id === room.id)
            ) {
                setPublicRooms((prev: TPublicRoom[]): TPublicRoom[] =>
                    prev.map((r: TPublicRoom) => {
                        if (r.id === room.id) {
                            return { ...r, unread: true };
                        }
                        return r;
                    }),
                );
            }
        });
    }, [publicRooms, pathname]);

    return (
        <MenuFrame label="Public Rooms" icon={<CoffeeOutlined />}>
            {loading
                ? Array.from({ length: 3 }).map(() => (
                      <Skeleton
                          key={uuidv4()}
                          className={cn("h-5", "w-full", "cursor-pointer")}
                      />
                  ))
                : publicRooms.map((r: TPublicRoom) => (
                      <MenuItem
                          key={uuidv4()}
                          title={r.title as string}
                          images={r.users
                              .map(user => user.avatar as string)
                              .filter(Boolean)}
                          selected={pathname.includes(r.id)}
                          type={RoomModel.PUBLIC}
                          unread={r.unread}
                          onClick={() => {
                              router.push(`/rooms/${r.id}`);
                          }}
                      />
                  ))}
            {children}
        </MenuFrame>
    );
}
