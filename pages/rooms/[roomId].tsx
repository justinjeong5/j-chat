import AppFrame from "components/layout/AppFrame";
import ChatFrame from "components/layout/ChatFrame";
import Header from "components/navigation/Header";
import Menu from "components/navigation/Menu";
import Dialog from "components/structure/Dialog";
import Textator from "components/structure/Textator";
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
    const [chatRoom, setChatRoom] = useState({ title: "" });
    const [dialogs, setDialogs] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                if (!router.query.roomId) {
                    return;
                }
                const { data } = await client.get(
                    `rooms/${router.query.roomId}`,
                );
                setChatRoom(new RoomModel(data));
            } catch (e) {
                errorHandler(e);
            }
        })();
    }, [router.query]);

    useEffect(() => {
        (async () => {
            try {
                if (!router.query.roomId) {
                    return;
                }
                const { dialogs: dialogData } = await useDialogs(
                    router.query.roomId,
                );
                setDialogs(dialogData);
            } catch (e) {
                errorHandler(e);
            }
        })();
    }, [chatRoom]);

    return (
        <>
            {contextHolder}
            <AppFrame
                menu={<Menu />}
                header={<Header title={chatRoom.title} />}
            >
                <ChatFrame
                    dialog={<Dialog dialogs={dialogs} />}
                    textator={<Textator />}
                />
            </AppFrame>
        </>
    );
}

export default WithAuth(Room);
