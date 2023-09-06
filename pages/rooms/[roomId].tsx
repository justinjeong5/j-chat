import Dialog from "components/content/Dialog";
import Header from "components/content/Header";
import Textator from "components/content/Textator";
import AppFrame from "components/layout/AppFrame";
import ChatFrame from "components/layout/ChatFrame";
import Menu from "components/sider/Menu";
import WithAuth from "hoc/WithAuth";
import useDialogs from "hooks/dialog/dialogs";
import useNotice from "hooks/notice/notice";
import client from "lib/api";
import RoomModel from "models/Room";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Room() {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();
    const [chatRoom, setChatRoom] = useState({
        title: "",
        users: [],
        dialogs: [],
    });
    const [dialogs, setDialogs] = useState([]);
    const [fetchingData, setFetchingData] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                if (!router.query.roomId) {
                    return;
                }
                setFetchingData(true);
                const { data } = await client.get(
                    `rooms/${router.query.roomId}`,
                );
                setChatRoom(new RoomModel(data));

                const { dialogs: dialogData } = await useDialogs(
                    router.query.roomId,
                );
                setDialogs(dialogData);
            } catch (e) {
                errorHandler(e);
            } finally {
                setFetchingData(false);
            }
        })();
    }, [router.query]);

    return (
        <>
            {contextHolder}
            <AppFrame
                menu={<Menu />}
                header={<Header room={chatRoom} loading={fetchingData} />}
            >
                <ChatFrame
                    dialog={<Dialog dialogs={dialogs} loading={fetchingData} />}
                    textator={<Textator />}
                />
            </AppFrame>
        </>
    );
}

export default WithAuth(Room);
