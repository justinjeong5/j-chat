"use client";

import Dialog from "@components/content/Dialog";
import Header from "@components/content/Header";
import Textator from "@components/content/Textator";
import AppFrame from "@components/layout/AppFrame";
import ChatFrame from "@components/layout/ChatFrame";
import Menu from "@components/sider/Menu";
import WithAuth from "@hoc/WithAuth";
import useNotice from "@hooks/notice/notice";
import typingPlaceholder from "@lib/string/typingPlaceholder";
import MessageModel from "@models/Message";
import RoomRepo from "@repos/Room";
import { sendChat, subscribeChat } from "@socket/chat";
import {
    subscribeTyping,
    subscribeTypingDone,
    typingChat,
    typingDone,
} from "@socket/chatTyping";
import { disconnectSocket, initiateSocket } from "@socket/index";
import { enterRoom, exitRoom, leaveRoom } from "@socket/room";
import IRoom from "@t/room.type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Room({ user }) {
    const router = useRouter();
    const params = useParams();
    const { errorHandler, contextHolder } = useNotice();
    const [chatRoom, setChatRoom] = useState({} as IRoom);

    const [typingUsers, setTypingUsers] = useState([] as string[]);
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

    const handleTyping = () => {
        typingChat(chatRoom.id, user.username);
    };

    const handleTypingDone = () => {
        typingDone(chatRoom.id, user.username);
    };

    useEffect(() => {
        (async () => {
            try {
                const { roomId } = params;
                if (!roomId) {
                    return;
                }

                setFetchingData(true);
                typingDone(roomId, user.username);
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
    }, []);

    useEffect(() => {
        if (chatRoom.id) {
            enterRoom(chatRoom.id);
        }
        return () => {
            if (chatRoom.id) {
                typingDone(chatRoom.id, user.username);
                exitRoom(chatRoom.id);
            }
        };
    }, [chatRoom.id]);

    useEffect(() => {
        const hideMessageTour = JSON.parse(
            localStorage.getItem("j-chat-hide-message-tour") || "true",
        );
        setLocalStorageHideMessageTour(hideMessageTour);

        initiateSocket();
        subscribeChat(chat => {
            setChatRoom(prev => ({ ...prev, dialog: [...prev.dialog, chat] }));
        });
        subscribeTyping((username: string) => {
            if (username === user.username) {
                return;
            }
            setTypingUsers((prev: string[]) => {
                if (prev.includes(username)) {
                    return prev;
                }
                return [...prev, username];
            });
        });
        subscribeTypingDone(username => {
            setTypingUsers(prev => prev.filter(u => u !== username));
        });

        return () => {
            typingDone(chatRoom.id, user.username);
            disconnectSocket();
        };
    }, []);

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
                    typing={typingPlaceholder(typingUsers)}
                    textator={
                        <Textator
                            placeholder={`#${chatRoom.title} 채널에서 이야기하기`}
                            messageTour={showMessageTour}
                            handleSubmit={handleSubmit}
                            handleTyping={handleTyping}
                            handleTypingDone={handleTypingDone}
                        />
                    }
                />
            </AppFrame>
        </>
    );
}

export default WithAuth(Room);
