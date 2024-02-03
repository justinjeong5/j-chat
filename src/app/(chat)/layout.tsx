"use client";

import AppFrame from "@app/_component/AppFrame";
import Menu from "@app/_component/Menu";
import WithAuth from "@app/_hoc/WithAuth";
import WithSocket from "@app/_hoc/WithSocket";

function ChatLayout({ user, children }) {
    return <AppFrame menu={<Menu user={user} />}>{children}</AppFrame>;
}

export default WithSocket(WithAuth(ChatLayout));
