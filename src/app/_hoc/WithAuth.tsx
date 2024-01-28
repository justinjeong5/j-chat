"use client";

import LottieLayout from "@app/_component/LottieLayout";
import useLogin from "@hooks/login";
import { Player } from "@lottiefiles/react-lottie-player";
import { TUser } from "@t/user.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Lottie from "../../../public/lottie/loading.json";

export default function WithAuth(WrappedComponent) {
    return function ChildComponent(props) {
        const router = useRouter();
        const { init } = useLogin();

        const [user, setUser] = useState({ email: "", username: "" } as TUser);

        useEffect(() => {
            (async () => {
                try {
                    const loginUser = await init();
                    setUser(loginUser);
                } catch (err) {
                    router.push("/login");
                }
            })();
        }, []);

        if (!user.email) {
            return (
                <LottieLayout>
                    <Player src={Lottie} autoplay loop />
                </LottieLayout>
            );
        }
        return <WrappedComponent {...props} user={user} />;
    };
}
