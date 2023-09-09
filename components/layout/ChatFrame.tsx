import { Divider } from "antd";
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
    return (
        <Container>
            <Dialog>{dialog}</Dialog>
            <Divider />
            <Textator>{textator}</Textator>
        </Container>
    );
}
