"use client";

import {
    BuildOutlined,
    CommentOutlined,
    LikeOutlined,
    StarOutlined,
} from "@ant-design/icons";
import WithAuth from "@app/_hoc/WithAuth";
import type { DescriptionsProps } from "antd";
import { Col, Descriptions, Row, Statistic, Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";

function DetailPage({ user }) {
    const router = useRouter();
    const pathname = usePathname();
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
            children: getLocaleString(user.lastLogin),
        },
        {
            key: "createdAt",
            label: "가입일",
            children: getLocaleString(user.createdAt),
        },
        {
            key: "updatedAt",
            label: "최근 수정일",
            children: getLocaleString(user.updatedAt),
        },
    ];

    return (
        <>
            <div>사용자 정보</div>

            <Tabs
                activeKey={pathname}
                type="card"
                onTabClick={key => router.push(key)}
                items={[
                    {
                        label: "회원 정보",
                        key: "/user/detail",
                    },
                    {
                        label: "정보 수정",
                        key: "/user/edit",
                    },
                    {
                        label: "참여 내역",
                        key: "/user/history",
                    },
                ]}
            />
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

export default WithAuth(DetailPage);
