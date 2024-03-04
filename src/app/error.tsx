"use client";

import LottieLayout from "@app/_component/LottieLayout";
import { Player } from "@lottiefiles/react-lottie-player";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import LottieError from "../../public/lottie/error.json";

function Error({ error }) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <LottieLayout>
            <Player src={LottieError} autoplay loop />
        </LottieLayout>
    );
}

export default Error;
