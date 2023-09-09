import type { TourProps } from "antd";
import { Button, Input, Space, Tour } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const { TextArea } = Input;

const SpaceWrapper = styled.div`
    text-align: right;
    margin-top: ${({ theme: { SPACING } }) => SPACING.STANDARD};
`;

const HiddenTextArea = styled.div`
    height: 76px;
    margin-bottom: -77px;
    width: 100%;
    visibility: hidden;
`;

export default function Textator({
    placeholder = "대화를 시작해 보세요.",
    dialogTour = false,
}) {
    const textAreaRef = useRef(null);
    const fileBtnRef = useRef(null);
    const sendBtnRef = useRef(null);
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        if (dialogTour) {
            setShowTour(true);
        }
    }, [dialogTour]);

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
        localStorage.setItem("jChatHideDialogTour", JSON.stringify(true));
        setShowTour(false);
    };

    return (
        <>
            <HiddenTextArea ref={textAreaRef} />
            <TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                placeholder={placeholder}
            />
            <SpaceWrapper>
                <Space wrap>
                    <Button ref={fileBtnRef}>파일 첨부</Button>
                    <Button type="primary" ref={sendBtnRef}>
                        전송
                    </Button>
                </Space>
            </SpaceWrapper>

            <Tour open={showTour} onClose={handleTourClose} steps={steps} />
        </>
    );
}
