"use client";

import WithAuth from "@app/_hoc/WithAuth";
import ChatFrame from "@app/(chat)/rooms/[roomId]/_component/ChatFrame";
import Dialog from "@app/(chat)/rooms/[roomId]/_component/Dialog";
import RoomHeader from "@app/(chat)/rooms/[roomId]/_component/RoomHeader";
import Textator from "@app/(chat)/rooms/[roomId]/_component/Textator";
import useNotice from "@hooks/notice";
import usePageRemember from "@hooks/page/remember";
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
import { TTypingUser } from "@t/user.type";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

function RoomPage({ user }) {
    const router = useRouter();
    const params = useParams();
    const { errorHandler, contextHolder } = useNotice();
    const { rememberPage } = usePageRemember();
    const [chatRoom, setChatRoom] = useState({} as IRoom);

    const [typingUsers, setTypingUsers] = useState([] as TTypingUser[]);
    const [fetchingData, setFetchingData] = useState(false);

    const typings = useMemo(
        () => typingPlaceholder(typingUsers),
        [typingUsers],
    );

    const handleLeaveRoom = useCallback(
        async roomId => {
            await RoomRepo.leaveRoom(roomId, user.id);
            router.replace("/");
            leaveRoom(roomId, user.id);
        },
        [user.id],
    );

    const handleToggleStarred = useCallback(async () => {
        const room = await RoomRepo.toggleStarred(chatRoom.id);
        setChatRoom(room);
    }, [chatRoom.id]);

    const handleSubmit = useCallback(
        async content => {
            const message = MessageModel.createItem({
                content,
                writer: user.id,
                roomId: chatRoom.id,
            });

            sendChat(message);
        },
        [chatRoom.id, user.id],
    );

    const handleTyping = useCallback(() => {
        typingChat(chatRoom.id, user);
    }, [chatRoom.id, user]);

    const handleTypingDone = useCallback(() => {
        typingDone(chatRoom.id, user);
    }, [chatRoom.id, user]);

    useEffect(() => {
        (async () => {
            try {
                const { roomId } = params;
                if (!roomId) {
                    return;
                }

                setFetchingData(true);
                typingDone(roomId, user);
                const room = await RoomRepo.get(roomId);
                setChatRoom(room);
            } catch (e) {
                errorHandler(e);
            } finally {
                setFetchingData(false);
            }
        })();
    }, [params.roomId, user]);

    useEffect(() => {
        if (chatRoom.id) {
            enterRoom(chatRoom.id);
            rememberPage(chatRoom.id);
        }
        if (user.id) {
            subscribeTyping((u: TTypingUser) => {
                if (u.id === user.id) {
                    return;
                }
                setTypingUsers((prev: TTypingUser[]) => {
                    if (prev.find(p => p.id === u.id)) {
                        return prev;
                    }
                    return [...prev, u];
                });
            });
        }

        subscribeChat(chat => {
            setChatRoom(prev => ({
                ...prev,
                dialog: [...(prev.dialog || []), chat],
            }));
        });
        subscribeTypingDone((u: TTypingUser) => {
            setTypingUsers((prev: TTypingUser[]) => {
                if (prev.find(p => p.id === u.id)) {
                    return prev.filter(p => p.id !== u.id);
                }
                return prev;
            });
        });

        return () => {
            if (chatRoom.id) {
                typingDone(chatRoom.id, user);
                exitRoom(chatRoom.id);
            }
        };
    }, [chatRoom.id, user]);

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
                typing={typings}
                textator={
                    <Textator
                        placeholder={`#${chatRoom.title} 채널에서 이야기하기`}
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
