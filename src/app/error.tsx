"use client";

import LottieLayout from "@app/_component/LottieLayout";
import { Player } from "@lottiefiles/react-lottie-player";

import LottieError from "../../public/lottie/error.json";

function Error() {
    return (
        <LottieLayout>
            <Player src={LottieError} autoplay loop />
        </LottieLayout>
    );
}

export default Error;
