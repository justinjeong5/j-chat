import { Divider } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
`;

export default function ChatFrame({ dialog, textator }) {
    return (
        <Container>
            {dialog}
            <Divider />
            {textator}
        </Container>
    );
}

ChatFrame.propTypes = {
    dialog: PropTypes.element.isRequired,
    textator: PropTypes.element.isRequired,
};
