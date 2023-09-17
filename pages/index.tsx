import Dialog from "components/content/Dialog";
import Textator from "components/content/Textator";
import AppFrame from "components/layout/AppFrame";
import ChatFrame from "components/layout/ChatFrame";
import Menu from "components/sider/Menu";
import WithAuth from "hoc/WithAuth";

function Page({ user }) {
    return (
        <AppFrame menu={<Menu user={user} />} header={<div>Header</div>}>
            <ChatFrame dialog={<Dialog />} textator={<Textator />} />
        </AppFrame>
    );
}

export default WithAuth(Page);
