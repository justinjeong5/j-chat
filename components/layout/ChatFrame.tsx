import styled from "styled-components";

const Container = styled.div`
    height: 100%;
`;

const Dialog = styled.div`
    height: ${({ theme: { SPACING } }) => SPACING.CONTENT.HEIGHT};
    width: ${({ theme: { SPACING } }) => SPACING.CONTENT.MIN_WIDTH};
    max-width: 100%;
    margin-bottom: 1rem;
    overflow: scroll;
`;

const Typing = styled.div`
    height: 1rem;
    padding-left: 0.5rem;
    opacity: 0.6;
`;

const Textator = styled.div`
    margin-top: 1rem;
`;

export default function ChatFrame({ dialog, typing = null, textator }) {
    return (
        <Container>
            <Dialog>{dialog}</Dialog>
            <Typing>{typing}</Typing>
            <Textator>{textator}</Textator>
        </Container>
    );
}
