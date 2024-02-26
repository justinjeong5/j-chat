"use client";

import {
    BuildOutlined,
    CommentOutlined,
    LikeOutlined,
    StarOutlined,
} from "@ant-design/icons";
import WithAuth from "@app/_hoc/WithAuth";
import { TUser } from "@t/user.type";
import type { DescriptionsProps } from "antd";
import { Col, Descriptions, Row, Statistic } from "antd";
import { useEffect } from "react";

function UserDetailPage({ user }: { user: TUser }) {
    const getLocaleString = (t: Date) => {
        return new Date(t).toLocaleDateString("ko-KR");
    };

    const items: DescriptionsProps["items"] = [
        {
            key: "username",
            label: "사용자 이름",
            children: user.username,
        },
        {
            key: "email",
            label: "이메일",
            children: user.email,
        },
        {
            key: "description",
            label: "설명",
            children: user.description,
        },
        {
            key: "lastlogin",
            label: "마지막 접속",
            children: getLocaleString(user.lastLogin as Date),
        },
        {
            key: "createdAt",
            label: "가입일",
            children: getLocaleString(user.createdAt as Date),
        },
        {
            key: "updatedAt",
            label: "최근 수정일",
            children: getLocaleString(user.updatedAt as Date),
        },
    ];

    useEffect(() => {
        console.log("user", user);
    }, [user]);

    return (
        <>
            <Descriptions items={items} />
            <Row gutter={16}>
                <Col span={4}>
                    <Statistic
                        title="대화방"
                        value={user.rooms?.length}
                        prefix={<CommentOutlined />}
                    />
                </Col>
                <Col span={4}>
                    <Statistic
                        title="대화"
                        value={user.dialog?.length}
                        prefix={<CommentOutlined />}
                    />
                </Col>
                <Col span={4}>
                    <Statistic
                        title="좋아요"
                        value={user.likes?.length}
                        prefix={<LikeOutlined />}
                    />
                </Col>
                <Col span={4}>
                    <Statistic
                        title="댓글"
                        value={user.comments?.length}
                        prefix={<BuildOutlined />}
                    />
                </Col>
                <Col span={4}>
                    <Statistic
                        title="즐겨찾기"
                        value={user.stars?.length}
                        prefix={<StarOutlined />}
                    />
                </Col>
            </Row>
        </>
    );
}

export default WithAuth(UserDetailPage);
