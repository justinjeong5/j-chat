"use client";

import LottieLayout from "@app/_component/LottieLayout";
import { Player } from "@lottiefiles/react-lottie-player";

import Lottie from "../../../public/lottie/loading.json";

export default function WithLottie(WrappedComponent) {
    return function ChildComponent(props) {
        if (!props?.user?.email) {
            return (
                <LottieLayout>
                    <Player src={Lottie} autoplay loop />
                </LottieLayout>
            );
        }
        return <WrappedComponent {...props} />;
    };
}
