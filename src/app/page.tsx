"use client";

import AppFrame from "@app/_component/AppFrame";
import Header from "@app/_component/Header";
import LottieLayout from "@app/_component/LottieLayout";
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

import LottieMain from "../../public/lottie/main.json";

function ContentFrame({ children }) {
    return <div className={cn("m-2")}>{children}</div>;
}

function Home({ user }: { user: TUser }) {
    const router = useRouter();
    const { lastPage } = usePageRemember();

    useEffect(() => {
        if (lastPage) {
            router.replace(`rooms/${lastPage}`);
        }
    }, []);

    return (
        <AppFrame menu={<Menu user={user} />}>
            <Header title="첫 페이지">
                <div>JChat에 오신 것을 환영합니다.</div>
            </Header>
            <ContentFrame>
                <LottieLayout>
                    <Player src={LottieMain} autoplay loop />
                </LottieLayout>
            </ContentFrame>
        </AppFrame>
    );
}

export default WithSocket(WithAuth(WithLottie(Home)));
