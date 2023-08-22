import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import useMobile from "hooks/layout/device";
import Diaglog from "models/Dialog";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: calc(100% - 174px);
    overflow: scroll;
`;
const TextWrapper = styled.div`
    margin-top: ${({ theme: { SPACING } }) => SPACING.STANDARD};
    font: ${({ theme: { FONT } }) => FONT.FAMILY};
`;

function IconText({ icon, text }: { icon: React.FC; text: string }) {
    return (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
}

export default function Dialog() {
    const isMobile = useMobile();

    const data = Array.from({ length: 23 }).map((_, i) => {
        return new Diaglog({
            id: i,
            name: `ant design part ${i}`,
            avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
            description:
                "Ant Design, a design language for background applications, is refined by Ant UED Team.",
            content:
                "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
            created_at: new Date(),
            updated_at: new Date(),
        });
    });

    return (
        <Container>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={item => (
                    <List.Item
                        key={item.name}
                        actions={[
                            <IconText
                                icon={StarOutlined}
                                text="156"
                                key="list-vertical-star-o"
                            />,
                            <IconText
                                icon={LikeOutlined}
                                text="156"
                                key="list-vertical-like-o"
                            />,
                            <IconText
                                icon={MessageOutlined}
                                text="2"
                                key="list-vertical-message"
                            />,
                        ]}
                        extra={
                            !isMobile && (
                                <img
                                    style={{
                                        maxWidth: "30vw",
                                        minWidth: "100px",
                                    }}
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            )
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.name}</a>}
                            description={item.description}
                        />
                        {isMobile && (
                            <img
                                style={{
                                    maxWidth: "30vw",
                                    minWidth: "100px",
                                }}
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        )}
                        <TextWrapper>{item.content}</TextWrapper>
                    </List.Item>
                )}
            />
        </Container>
    );
}
