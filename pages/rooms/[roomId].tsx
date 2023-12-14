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
import { sendChat, subscribeChat } from "socket/chat";
import { disconnectSocket, initiateSocket } from "socket/index";
import { enterRoom, exitRoom, leaveRoom } from "socket/room";
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

    const handleSubmit = async content => {
        const message = MessageModel.createItem({
            content,
            writer: user.id,
            roomId: chatRoom.id,
        });

        sendChat(message);
    };

    const handleLeaveRoom = async roomId => {
        await RoomRepo.leaveRoom(roomId, user.id);
        router.replace("/");
        leaveRoom(roomId, user.id);
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

        initiateSocket();
        subscribeChat(chat => {
            setChatRoom(prev => ({ ...prev, dialog: [...prev.dialog, chat] }));
        });

        return () => {
            disconnectSocket();
        };
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const roomId = router.query.roomId as string;
                if (!roomId) {
                    return;
                }

                setFetchingData(true);
                const room = await RoomRepo.get(roomId);
                setChatRoom(room);

                if (!localStorageHideMessageTour && !room.dialog.length) {
                    setShowMessageTour(true);
                }
            } catch (e) {
                errorHandler(e);
            } finally {
                setFetchingData(false);
            }
        })();
    }, [router.query]);

    useEffect(() => {
        if (chatRoom.id) {
            enterRoom(chatRoom.id);
        }
        return () => {
            if (chatRoom.id) {
                exitRoom(chatRoom.id);
            }
        };
    }, [chatRoom.id]);

    return (
        <>
            {contextHolder}
            <AppFrame
                menu={<Menu user={user} />}
                header={
                    <Header
                        room={chatRoom}
                        loading={fetchingData}
                        leaveRoom={handleLeaveRoom}
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
