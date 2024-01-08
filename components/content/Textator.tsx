import { cn } from "@lib/utils";
import type { TourProps } from "antd";
import { Button, Input, Space, Tour } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const { TextArea } = Input;

export default function Textator({
    handleSubmit = msg => msg,
    handleTyping = () => {},
    handleTypingDone = () => {},
    placeholder = "대화를 시작해 보세요.",
    messageTour = false,
    sending = false,
}) {
    const searchParams = useSearchParams();
    const textAreaRef = useRef(null);
    const fileBtnRef = useRef(null);
    const sendBtnRef = useRef(null);
    const [showTour, setShowTour] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (messageTour) {
            setShowTour(true);
        }
    }, [messageTour]);

    useEffect(() => {
        if (message.trim().length) {
            handleTyping();
        } else {
            handleTypingDone();
        }
    }, [message]);

    useEffect(() => {
        if (searchParams?.get("roomId")) {
            setMessage("");
        }
        return () => {
            setMessage("");
        };
    }, [searchParams]);

    const steps: TourProps["steps"] = [
        {
            title: "메세지 작성",
            description: "나누고 싶은 이야기를 작성해 보세요.",
            placement: "top",
            cover: (
                <img
                    alt="tour.png"
                    src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                />
            ),
            target: () => textAreaRef.current,
        },
        {
            title: "파일 첨부",
            description: "그림과 동영상을 이용하여 다채롭게 이야기해 보세요.",
            placement: "top",
            target: () => fileBtnRef.current,
        },
        {
            title: "메세지 전송",
            description: "이야기를 전송하여 대화를 시작해 보세요.",
            placement: "top",
            target: () => sendBtnRef.current,
        },
    ];

    const handleTourClose = () => {
        localStorage.setItem("jChatHideMessageTour", JSON.stringify(true));
        setShowTour(false);
    };

    const handleSend = e => {
        e.preventDefault();
        setMessage("");

        const trimmedMessage = message.trim();
        if (!trimmedMessage.length) {
            return;
        }
        handleSubmit(trimmedMessage);
    };

    const handleChange = e => {
        if (e.target.value.includes("\n")) {
            e.preventDefault();
            handleSend(e);
            return;
        }
        setMessage(e.target.value);
    };

    return (
        <>
            <div
                className={cn("h-[76px]", "mb-[-77px]", "w-full", "invisible")}
                ref={textAreaRef}
            />
            <TextArea
                value={message}
                autoSize={{ minRows: 3, maxRows: 3 }}
                placeholder={placeholder}
                onChange={handleChange}
            />
            <div className={cn("text-right", "mt-4")}>
                <Space wrap>
                    <Button ref={fileBtnRef}>파일 첨부</Button>
                    <Button
                        className={cn("bg-[#1677FF]")}
                        type="primary"
                        ref={sendBtnRef}
                        onClick={handleSend}
                        disabled={sending}
                    >
                        전송
                    </Button>
                </Space>
            </div>

            <Tour open={showTour} onClose={handleTourClose} steps={steps} />
        </>
    );
}
