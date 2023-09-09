import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Empty, List, Skeleton, Space } from "antd";
import useMobile from "hooks/layout/device";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import IMessage from "types/message.type";
import { v4 as uuidv4 } from "uuid";

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

export default function Dialog({
    dialog = [],
    loading = false,
    autoFocus = false,
}) {
    const dialogFocus = useRef(null);

    const isMobile = useMobile();
    const SKELETON_COUNT = 5;

    useEffect(() => {
        if (autoFocus) {
            dialogFocus.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [dialog]);

    if (loading) {
        return (
            <>
                {Array.from({ length: SKELETON_COUNT }).map(() => (
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
            </>
        );
    }

    if (!dialog.length) {
        return (
            <EmptyWrapper>
                <Empty description="No dialog" />
            </EmptyWrapper>
        );
    }
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={dialog}
                renderItem={(item: IMessage) => (
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
            <div ref={dialogFocus} />
        </>
    );
}
