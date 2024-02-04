import { CoffeeOutlined } from "@ant-design/icons";
import MenuFrame from "@app/_component/menu/MenuFrame";
import MenuItem from "@app/_component/menu/MenuItem";
import Skeleton from "@components/Skeleton";
import { cn } from "@lib/utils";
import { TRoom } from "@t/room.type";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({
    loading,
    rooms,
    children,
}: {
    loading: boolean;
    rooms: TRoom[];
    children?: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

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
                          key={uuidv4()}
                          title={r.title as string}
                          images={r.users
                              .map(user => user.avatar as string)
                              .filter(Boolean)}
                          selected={pathname === `/rooms/${r.id}`}
                          type="public"
                          onClick={() => {
                              router.push(`/rooms/${r.id}`);
                          }}
                      />
                  ))}
            {children}
        </MenuFrame>
    );
}
