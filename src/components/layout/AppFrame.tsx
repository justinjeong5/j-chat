import { cn } from "@lib/utils";
import { Layout } from "antd";

const { Sider, Content, Header } = Layout;

export default function AppFrame({ menu, header, children }) {
    return (
        <div className={cn("my-0", "mx-auto", "max-w-[1400px]")}>
            <Layout className={cn("bg-[white]")} hasSider>
                <Sider
                    className={cn(
                        "bg-[white]",
                        "fixed",
                        "left-0",
                        "top-0",
                        "bottom-0",
                        "h-[calc(100vh-1rem)]",
                        "overflow-auto",
                    )}
                    width={300}
                    theme="light"
                    breakpoint="md"
                    collapsedWidth={0}
                >
                    {menu}
                </Sider>
                <Layout>
                    <Header className={cn("bg-[white]", "h-[89px]")}>
                        {header}
                    </Header>
                    <Content className={cn("bg-[white]", "p-4")}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
