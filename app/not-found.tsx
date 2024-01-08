"use client";

import LottieLayout from "@components/layout/LottieLayout";
import { Player } from "@lottiefiles/react-lottie-player";
import LottieNotFound from "public/lottieNotFound.json";

function NotFound() {
    return (
        <LottieLayout>
            <Player src={LottieNotFound} autoplay loop />
        </LottieLayout>
    );
}

export default NotFound;
