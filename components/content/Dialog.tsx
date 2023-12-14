import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Empty, List, Skeleton, Space } from "antd";
import useMobile from "hooks/layout/device";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { TCommon } from "types/common.type";
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

const ActionItems = (item: {
    stars: Array<TCommon>;
    likes: Array<TCommon>;
    comments: Array<TCommon>;
}) => {
    return [
        <Space>
            <StarOutlined />
            {item.stars.length}
        </Space>,
        <Space>
            <LikeOutlined />
            {item.likes.length}
        </Space>,
        <Space>
            <MessageOutlined />
            {item.comments.length}
        </Space>,
    ];
};

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
            dialogFocus.current?.scrollIntoView({ behavior: "instant" });
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
                renderItem={(item: IMessage) => {
                    if (item.type === "joinRoom") {
                        return (
                            <List.Item key={item.id}>
                                <TextWrapper>
                                    {item.writer?.username} 님께서 입장했습니다.
                                </TextWrapper>
                            </List.Item>
                        );
                    }
                    if (item.type === "leaveRoom") {
                        return (
                            <List.Item key={item.id}>
                                <TextWrapper>
                                    {item.writer?.username} 님께서 퇴장했습니다.
                                </TextWrapper>
                            </List.Item>
                        );
                    }
                    return (
                        <List.Item
                            key={item.id}
                            actions={ActionItems(item)}
                            extra={
                                !isMobile &&
                                item.image && (
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
                                avatar={<Avatar src={item.writer?.avatar} />}
                                title={item.writer?.username}
                            />
                            {isMobile && item.image && (
                                <img
                                    style={{ maxWidth: "24vw" }}
                                    width="272px"
                                    alt="userImage"
                                    src={item.image}
                                />
                            )}
                            <TextWrapper>{item.content}</TextWrapper>
                        </List.Item>
                    );
                }}
            />
            <div ref={dialogFocus} />
        </>
    );
}
