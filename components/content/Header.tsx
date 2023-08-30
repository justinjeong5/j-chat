import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;

export default function Header({ title }) {
    return (
        <Container>
            <div>{title}</div>
        </Container>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};