"use client";

import LottieLayout from "@components/layout/LottieLayout";
import useLogin from "@hooks/login";
import { Player } from "@lottiefiles/react-lottie-player";
import { TUser } from "@t/user.type";
import { useRouter } from "next/navigation";
import Lottie from "public/lottie.json";
import { useEffect, useState } from "react";

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
