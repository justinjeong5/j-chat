import Dialog from "components/content/Dialog";
import Header from "components/content/Header";
import Textator from "components/content/Textator";
import AppFrame from "components/layout/AppFrame";
import ChatFrame from "components/layout/ChatFrame";
import Menu from "components/sider/Menu";
import WithAuth from "hoc/WithAuth";
import useNotice from "hooks/notice/notice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RoomRepo from "repos/Room";

function Room() {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();
    const [chatRoom, setChatRoom] = useState({
        title: "",
        users: [],
        dialogs: [],
    });

    const [fetchingData, setFetchingData] = useState(false);
    const [showDialogTour, setShowDialogTour] = useState(false);
    const [localStorageHideDialogTour, setLocalStorageHideDialogTour] =
        useState(false);

    useEffect(() => {
        const hideDialogTour = JSON.parse(
            localStorage.getItem("jChatHideDialogTour"),
        );
        setLocalStorageHideDialogTour(hideDialogTour);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const roomId = router.query.roomId as string;
                if (!roomId) {
                    return;
                }

                setFetchingData(true);
                const data = await RoomRepo.getRoomWithDialogs(roomId);
                setChatRoom(data);

                if (!localStorageHideDialogTour && !data.dialogs.length) {
                    setShowDialogTour(true);
                }
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
                    dialog={
                        <Dialog
                            dialogs={chatRoom.dialogs}
                            loading={fetchingData}
                        />
                    }
                    textator={
                        <Textator
                            placeholder={`#${chatRoom.title} 채널에서 이야기하기`}
                            dialogTour={showDialogTour}
                        />
                    }
                />
            </AppFrame>
        </>
    );
}

export default WithAuth(Room);
