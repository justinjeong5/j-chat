import { Divider } from "antd";
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
`;

const Message = styled.div`
    height: ${({ theme: { SPACING } }) => SPACING.CONTENT.HEIGHT};
    width: ${({ theme: { SPACING } }) => SPACING.CONTENT.MIN_WIDTH};
    max-width: 100%;
    overflow: scroll;
`;

const Textator = styled.div``;

export default function ChatFrame({ message, textator }) {
    return (
        <Container>
            <Message>{message}</Message>
            <Divider />
            <Textator>{textator}</Textator>
        </Container>
    );
}
