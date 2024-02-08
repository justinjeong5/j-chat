"use client";

import AppFrame from "@app/_component/AppFrame";
import Header from "@app/_component/Header";
import Menu from "@app/_component/Menu";
import WithAuth from "@app/_hoc/WithAuth";
import WithSocket from "@app/_hoc/WithSocket";
import usePageRemember from "@hooks/page/remember";
import { cn } from "@lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ContentFrame({ children }) {
    return <div className={cn("m-2")}>{children}</div>;
}

function Home({ user }) {
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
                <div>페이지 설명?</div>
            </Header>
            <ContentFrame>
                <div>페이지 내용</div>
                <div>페이지 내용</div>
                <div>페이지 내용</div>
                <div>페이지 내용</div>
                <div>페이지 내용</div>
                <div>페이지 내용</div>
            </ContentFrame>
        </AppFrame>
    );
}

export default WithSocket(WithAuth(Home));
