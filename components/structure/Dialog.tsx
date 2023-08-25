import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Empty, List, Space } from "antd";
import useMobile from "hooks/layout/device";
import DialogModel from "models/Dialog";
import PropTypes from "prop-types";
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
const EmptyWrapper = styled.div`
    height: calc(100vh - 364px);
    width: ${({ theme: { SPACING } }) => SPACING.LAYOUT.CONTENT_MIN_WIDTH};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ActionItems = ({
    stars,
    likes,
    comments,
}: {
    stars: string;
    likes: string;
    comments: string;
}) => [
    <Space>
        <StarOutlined />
        {stars}
    </Space>,
    <Space>
        <LikeOutlined />
        {likes}
    </Space>,
    <Space>
        <MessageOutlined />
        {comments}
    </Space>,
];

export default function Dialog({ dialogs }) {
    const isMobile = useMobile();

    return (
        <Container>
            {dialogs.length ? (
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={dialogs}
                    renderItem={item => (
                        <List.Item
                            key={item.name}
                            actions={ActionItems({
                                stars: item.stars.length,
                                likes: item.likes.length,
                                comments: item.comments.length,
                            })}
                            extra={
                                !isMobile && (
                                    <img
                                        style={{ maxWidth: "24vw" }}
                                        width="272px"
                                        alt="userImage"
                                        src={item.image}
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
                                    style={{ maxWidth: "24vw" }}
                                    width="272px"
                                    alt="userImage"
                                    src={item.image}
                                />
                            )}
                            <TextWrapper>{item.content}</TextWrapper>
                        </List.Item>
                    )}
                />
            ) : (
                <EmptyWrapper>
                    <Empty description="No dialogs" />
                </EmptyWrapper>
            )}
        </Container>
    );
}

Dialog.propTypes = {
    dialogs: PropTypes.arrayOf(PropTypes.instanceOf(DialogModel)).isRequired,
};
