import styled from "styled-components";

const Wrapper = styled.div`
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.3s;
    border-radius: 5px;
    padding: 3px;

    &:hover {
        background-color: #dedede;
    }
`;

export default function FieldActive({ children }) {
    return <Wrapper>{children}</Wrapper>;
}
