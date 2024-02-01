"use client";

import AppFrame from "@app/_component/AppFrame";
import Header from "@app/_component/Header";
import Menu from "@app/_component/Menu";
import WithAuth from "@app/_hoc/WithAuth";
import { cn } from "@lib/utils";

function ContentFrame({ children }) {
    return <div className={cn("m-2")}>{children}</div>;
}

function Home({ user }) {
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

export default WithAuth(Home);
