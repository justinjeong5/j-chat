"use client";

import Dialog from "@app/rooms/[roomId]/_component/Dialog";
import Textator from "@app/rooms/[roomId]/_component/Textator";
import AppFrame from "@app/_component/AppFrame";
import ChatFrame from "@app/rooms/[roomId]/_component/ChatFrame";
import Menu from "@components/sider/Menu";
import WithAuth from "@app/_hoc/WithAuth";

function Home({ user }) {
    return (
        <AppFrame menu={<Menu user={user} />} header={<div>Header App</div>}>
            <ChatFrame dialog={<Dialog />} textator={<Textator />} />
        </AppFrame>
    );
}

export default WithAuth(Home);
