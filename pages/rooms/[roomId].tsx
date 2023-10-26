import Dialog from "components/content/Dialog";
import Header from "components/content/Header";
import Textator from "components/content/Textator";
import AppFrame from "components/layout/AppFrame";
import ChatFrame from "components/layout/ChatFrame";
import Menu from "components/sider/Menu";
import WithAuth from "hoc/WithAuth";
import useNotice from "hooks/notice/notice";
import MessageModel from "models/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RoomRepo from "repos/Room";
import IRoom from "types/room.type";

function Room({ user }) {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();
    const [chatRoom, setChatRoom] = useState({
        title: "",
        users: [],
        dialog: [],
    } as IRoom);

    const [fetchingData, setFetchingData] = useState(false);
    const [showMessageTour, setShowMessageTour] = useState(false);
    const [localStorageHideMessageTour, setLocalStorageHideMessageTour] =
        useState(false);

    const handleSubmit = async message => {
        console.log("handleSubmit", message);
        const room = await RoomRepo.sendMessage(
            chatRoom.id,
            MessageModel.createItem({
                content: message,
                writer: user.id,
                roomId: chatRoom.id,
            }),
        );
        setChatRoom(room);
    };

    const handleToggleStarred = async () => {
        const room = await RoomRepo.toggleStarred(chatRoom.id);
        setChatRoom(room);
    };

    useEffect(() => {
        const hideMessageTour = JSON.parse(
            localStorage.getItem("jChatHideMessageTour"),
        );
        setLocalStorageHideMessageTour(hideMessageTour);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const roomId = router.query.roomId as string;
                if (!roomId) {
                    return;
                }

                setFetchingData(true);
                const data = await RoomRepo.get(roomId);
                setChatRoom(data);

                if (!localStorageHideMessageTour && !data.dialog.length) {
                    setShowMessageTour(true);
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
                menu={<Menu user={user} />}
                header={
                    <Header
                        room={chatRoom}
                        loading={fetchingData}
                        toggleStarred={handleToggleStarred}
                    />
                }
            >
                <ChatFrame
                    dialog={
                        <Dialog
                            dialog={chatRoom.dialog}
                            loading={fetchingData}
                            autoFocus
                        />
                    }
                    textator={
                        <Textator
                            placeholder={`#${chatRoom.title} 채널에서 이야기하기`}
                            messageTour={showMessageTour}
                            handleSubmit={handleSubmit}
                        />
                    }
                />
            </AppFrame>
        </>
    );
}

export default WithAuth(Room);
