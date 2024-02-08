"use client";

import WithAuth from "@app/_hoc/WithAuth";
import ChatFrame from "@app/(chat)/rooms/[roomId]/_component/ChatFrame";
import Dialog from "@app/(chat)/rooms/[roomId]/_component/Dialog";
import RoomHeader from "@app/(chat)/rooms/[roomId]/_component/RoomHeader";
import Textator from "@app/(chat)/rooms/[roomId]/_component/Textator";
import useNotice from "@hooks/notice";
import typingPlaceholder from "@lib/placeholder/typing-placeholder";
import MessageModel from "@models/Message";
import RoomRepo from "@repos/Room";
import { sendChat, subscribeChat } from "@socket/chat";
import {
    subscribeTyping,
    subscribeTypingDone,
    typingChat,
    typingDone,
} from "@socket/chatTyping";
import { enterRoom, exitRoom, leaveRoom } from "@socket/room";
import IRoom from "@t/room.type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function RoomPage({ user }) {
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

        subscribeChat(chat => {
            setChatRoom(prev => ({
                ...prev,
                dialog: [...(prev.dialog || []), chat],
            }));
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
        };
    }, []);

    return (
        <>
            {contextHolder}
            <RoomHeader
                room={chatRoom}
                loading={fetchingData}
                leaveRoom={handleLeaveRoom}
                toggleStarred={handleToggleStarred}
            />
            <ChatFrame
                dialog={
                    <Dialog dialog={chatRoom.dialog} loading={fetchingData} />
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
        </>
    );
}

export default WithAuth(RoomPage);
