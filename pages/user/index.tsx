import { Tabs } from "antd";
import AppFrame from "components/layout/AppFrame";
import SiderFrame from "components/layout/SiderFrame";
import Profile from "components/sider/Profile";
import WithAuth from "hoc/WithAuth";
import { useRouter } from "next/router";

function User({ user }) {
    const router = useRouter();

    return (
        <AppFrame
            menu={
                <SiderFrame
                    profile={<Profile user={user} />}
                    footer={<div>J-Chat v1.0.0</div>}
                >
                    <div>body</div>
                </SiderFrame>
            }
            header={<div>Header</div>}
        >
            <Tabs
                defaultActiveKey="1"
                type="card"
                onTabClick={key => router.push(`/user/${key}`)}
                items={[
                    {
                        label: "회원정보",
                        key: "detail",
                        children: <div>회원정보</div>,
                    },
                    {
                        label: "히스토리",
                        key: "history",
                        children: <div>히스토리</div>,
                    },
                    {
                        label: "참여내역",
                        key: "참여내역",
                        children: <div>참여내역</div>,
                    },
                ]}
            />
        </AppFrame>
    );
}

export default WithAuth(User);
