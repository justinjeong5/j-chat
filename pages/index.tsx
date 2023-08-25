import AppFrame from "components/layout/AppFrame";
import ChatFrame from "components/layout/ChatFrame";
import Menu from "components/navigation/Menu";
import Dialog from "components/structure/Dialog";
import Textator from "components/structure/Textator";
import WithAuth from "hoc/WithAuth";

function Page() {
    return (
        <AppFrame menu={<Menu />} header={<div>Header</div>}>
            <ChatFrame
                dialog={<Dialog dialogs={[]} />}
                textator={<Textator />}
            />
        </AppFrame>
    );
}

export default WithAuth(Page);
