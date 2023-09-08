import Message from "components/content/Message";
import Textator from "components/content/Textator";
import AppFrame from "components/layout/AppFrame";
import ChatFrame from "components/layout/ChatFrame";
import Menu from "components/sider/Menu";
import WithAuth from "hoc/WithAuth";

function Page() {
    return (
        <AppFrame menu={<Menu />} header={<div>Header</div>}>
            <ChatFrame message={<Message />} textator={<Textator />} />
        </AppFrame>
    );
}

export default WithAuth(Page);
