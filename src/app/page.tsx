"use client";

import AppFrame from "@app/_component/AppFrame";
import Header from "@app/_component/Header";
import Menu from "@app/_component/Menu";
import WithAuth from "@app/_hoc/WithAuth";
import WithLottie from "@app/_hoc/WithLottie";
import WithSocket from "@app/_hoc/WithSocket";
import usePageRemember from "@hooks/page/remember";
import { cn } from "@lib/utils";
import { Player } from "@lottiefiles/react-lottie-player";
import { TUser } from "@t/user.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home({ user }: { user: TUser }) {
    const router = useRouter();
    const { lastPage } = usePageRemember();

    useEffect(() => {
        if (lastPage) {
            router.replace(`rooms/${lastPage}`);
        }
    }, [lastPage]);

    return (
        <AppFrame menu={<Menu user={user} />}>
            <Header title="JChat에 오신 것을 환영합니다.">
                <div>
                    JChat은 다양한 사람과 즐거운 이야기를 나누는 대화
                    플랫폼입니다.
                </div>
            </Header>
            <div
                className={cn(
                    "flex",
                    "items-center",
                    "justify-between",
                    "h-4/5",
                    "w-max",
                    "m-auto",
                )}
            >
                <div>
                    <Player
                        className={cn("w-32")}
                        src="/lottie/main.json"
                        autoplay
                        loop
                    />
                    <div className={cn("m-4")}>대화를 시작해 보세요.</div>
                </div>
            </div>
        </AppFrame>
    );
}

export default WithSocket(WithAuth(WithLottie(Home)));
