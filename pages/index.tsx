import AppFrame from "components/layout/AppFrame";
import Menu from "components/navigation/Menu";
import Chat from "components/structure/chat/Chat";
import WithAuth from "hoc/WithAuth";

function Page() {
  return (
    <AppFrame menu={<Menu />} header={<div>Header</div>}>
      <Chat />
    </AppFrame>
  );
}

export default WithAuth(Page);
