import { CoffeeOutlined } from "@ant-design/icons";
import MenuFrame from "@app/_component/menu/MenuFrame";
import MenuItem from "@app/_component/menu/MenuItem";
import Skeleton from "@components/Skeleton";
import { cn } from "@lib/utils";
import { TRoom } from "@t/room.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({
    loading,
    rooms,
}: {
    loading: boolean;
    rooms: TRoom[];
}) {
    const router = useRouter();

    useEffect(() => {
        console.log("rooms", rooms);
    }, [rooms]);

    return (
        <MenuFrame label="Public Rooms" icon={<CoffeeOutlined />}>
            {loading
                ? Array.from({ length: 3 }).map(() => (
                      <Skeleton
                          key={uuidv4()}
                          className={cn("h-5", "w-full", "cursor-pointer")}
                      />
                  ))
                : rooms.map(r => (
                      <MenuItem
                          title={r.title as string}
                          images={r.users
                              .map(user => user.avatar as string)
                              .filter(Boolean)}
                          type="public"
                          onClick={() => {
                              router.push(`/rooms/${r.id}`);
                          }}
                      />
                  ))}
        </MenuFrame>
    );
}
