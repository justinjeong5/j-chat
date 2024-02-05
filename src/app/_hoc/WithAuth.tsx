"use client";

import LottieLayout from "@app/_component/LottieLayout";
import { Player } from "@lottiefiles/react-lottie-player";
import UserRepo from "@repos/User";
import { emitUserLogin, emitUserLogout } from "@socket/user";
import { TUser } from "@t/user.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Lottie from "../../../public/lottie/loading.json";

export default function WithAuth(WrappedComponent) {
    return function ChildComponent(props) {
        const router = useRouter();

        const [user, setUser] = useState({ email: "", username: "" } as TUser);

        useEffect(() => {
            (async () => {
                try {
                    const loginUser = await UserRepo.init();
                    emitUserLogin(loginUser);
                    setUser(loginUser);
                } catch (err) {
                    router.push("/login");
                }
            })();
            return () => {
                emitUserLogout(user);
            };
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
