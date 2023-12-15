import styled from "styled-components";

const LottieWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 80px);
`;

export default function LottieLayout({ children }) {
    return <LottieWrapper>{children}</LottieWrapper>;
}
