import LottieLayout from "@components/layout/LottieLayout";
import Lottie from "lottie-react";
import lottieNotFound from "public/lottieNotFound.json";
import styled from "styled-components";

const StyledLottie = styled(Lottie)`
    max-width: 480px;
`;

function NotFound() {
    return (
        <LottieLayout>
            <StyledLottie animationData={lottieNotFound} loop />
        </LottieLayout>
    );
}

export default NotFound;
