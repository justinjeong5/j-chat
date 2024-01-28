"use client";

import LottieLayout from "@app/_component/LottieLayout";
import { Player } from "@lottiefiles/react-lottie-player";

import LottieNotFound from "../../public/lottie/notFound.json";

function NotFound() {
    return (
        <LottieLayout>
            <Player src={LottieNotFound} autoplay loop />
        </LottieLayout>
    );
}

export default NotFound;
