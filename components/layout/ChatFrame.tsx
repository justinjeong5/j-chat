import { Divider } from "antd";
import { useEffect } from "react";
import { disconnectSocket, initiateSocket } from "socket/index";
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
`;

const Dialog = styled.div`
    height: ${({ theme: { SPACING } }) => SPACING.CONTENT.HEIGHT};
    width: ${({ theme: { SPACING } }) => SPACING.CONTENT.MIN_WIDTH};
    max-width: 100%;
    overflow: scroll;
`;

const Textator = styled.div``;

export default function ChatFrame({ dialog, textator }) {
    useEffect(() => {
        initiateSocket();
        console.log("initiateSocket");
        return () => {
            disconnectSocket();
            console.log("Socket Disconnected");
        };
    }, []);

    return (
        <Container>
            <Dialog>{dialog}</Dialog>
            <Divider />
            <Textator>{textator}</Textator>
        </Container>
    );
}
