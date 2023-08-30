import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Empty, List, Skeleton, Space } from "antd";
import useMobile from "hooks/layout/device";
import DialogModel from "models/Dialog";
import IDialog from "models/Dialog.type";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
    height: ${({ theme: { SPACING } }) => SPACING.CONTENT.HEIGHT};
    width: ${({ theme: { SPACING } }) => SPACING.CONTENT.MIN_WIDTH};
    max-width: 100%;
    overflow: scroll;
`;
const TextWrapper = styled.div`
    margin-top: ${({ theme: { SPACING } }) => SPACING.STANDARD};
    font: ${({ theme: { FONT } }) => FONT.FAMILY};
`;
const EmptyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ theme: { SPACING } }) => SPACING.CONTENT.EMPTY_HEIGHT};
`;
const SkeletonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-bottom: ${({ theme: { SPACING } }) => SPACING.BIGGER};
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
                {Array.from(Array(SKELETON_COUNT)).map(() => (
                    <SkeletonWrapper key={uuidv4()}>
                        <div style={{ width: "inherit" }}>
                            <Skeleton active avatar />
                            <StyledSpace>
                                <Skeleton.Button active size="small" />
                                <Skeleton.Button active size="small" />
                                <Skeleton.Button active size="small" />
                            </StyledSpace>
                        </div>
                        <Skeleton.Image active />
                    </SkeletonWrapper>
                ))}
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
    dialogs: PropTypes.arrayOf(PropTypes.instanceOf(DialogModel)),
    loading: PropTypes.bool,
};

Dialog.defaultProps = {
    dialogs: [],
    loading: false,
};
