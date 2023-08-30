import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Empty, List, Skeleton, Space } from "antd";
import useMobile from "hooks/layout/device";
import DialogModel from "models/Dialog";
import IDialog from "models/Dialog.type";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
    overflow: scroll;
    height: calc(100vh - 285px);
    width: ${({ theme: { SPACING } }) => SPACING.LAYOUT.CONTENT_MIN_WIDTH};
    max-width: 100%;
`;
const TextWrapper = styled.div`
    margin-top: ${({ theme: { SPACING } }) => SPACING.STANDARD};
    font: ${({ theme: { FONT } }) => FONT.FAMILY};
`;
const EmptyWrapper = styled.div`
    height: calc(100vh - 364px);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SkeletonWrapper = styled.div`
    display: flex;
    margin-bottom: ${({ theme: { SPACING } }) => SPACING.BIGGER};
    width: 100%;
    gap: 1rem;
`;
const StyledSpace = styled(Space)`
    margin-left: 56px;
`;

const ActionItems = ({
    stars,
    likes,
    comments,
}: {
    stars: number;
    likes: number;
    comments: number;
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

export default function Dialog({ dialogs, loading }) {
    const isMobile = useMobile();
    const SKELETON_COUNT = 5;

    if (loading) {
        return (
            <Container>
                {Array.from(Array(SKELETON_COUNT)).fill(
                    <SkeletonWrapper>
                        <div style={{ width: "inherit" }}>
                            <Skeleton active avatar />
                            <StyledSpace>
                                <Skeleton.Button active size="small" />
                                <Skeleton.Button active size="small" />
                                <Skeleton.Button active size="small" />
                            </StyledSpace>
                        </div>
                        <Skeleton.Image active />
                    </SkeletonWrapper>,
                )}
            </Container>
        );
    }

    if (!dialogs.length) {
        return (
            <Container>
                <EmptyWrapper>
                    <Empty description="No dialogs" />
                </EmptyWrapper>
            </Container>
        );
    }
    return (
        <Container>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={dialogs}
                renderItem={(item: IDialog) => (
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
        </Container>
    );
}

Dialog.propTypes = {
    dialogs: PropTypes.arrayOf(PropTypes.instanceOf(DialogModel)).isRequired,
    loading: PropTypes.bool,
};

Dialog.defaultProps = {
    loading: false,
};
