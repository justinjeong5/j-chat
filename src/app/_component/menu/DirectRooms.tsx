import { UserOutlined } from "@ant-design/icons";
import MenuFrame from "@app/_component/menu/MenuFrame";
import MenuItem from "@app/_component/menu/MenuItem";
import Skeleton from "@components/Skeleton";
import { cn } from "@lib/utils";
import { TGeneralUser } from "@t/user.type";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Rooms({
    loading,
    rooms,
}: {
    loading: boolean;
    rooms: TGeneralUser[];
}) {
    const router = useRouter();

    return (
        <MenuFrame label="Direct Messages" icon={<UserOutlined />}>
            {loading
                ? Array.from({ length: 3 }).map(() => (
                      <Skeleton
                          key={uuidv4()}
                          className={cn("h-5", "w-full", "cursor-pointer")}
                      />
                  ))
                : rooms.map(r => (
                      <MenuItem
                          title={r.username as string}
                          images={[r.avatar || ""].filter(Boolean)}
                          type="direct"
                          onClick={() => {
                              router.push(`/rooms/${r.id}`);
                          }}
                      />
                  ))}
        </MenuFrame>
    );
}
