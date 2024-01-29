"use client";

import AppFrame from "@app/_component/AppFrame";
import Menu from "@app/_component/Menu";
import WithAuth from "@app/_hoc/WithAuth";
import ChatFrame from "@app/(chat)/rooms/[roomId]/_component/ChatFrame";
import Dialog from "@app/(chat)/rooms/[roomId]/_component/Dialog";
import Textator from "@app/(chat)/rooms/[roomId]/_component/Textator";

function Home({ user }) {
    return (
        <AppFrame menu={<Menu user={user} />}>
            <div>Header App</div>
            <ChatFrame dialog={<Dialog />} textator={<Textator />} />
        </AppFrame>
    );
}

export default WithAuth(Home);
