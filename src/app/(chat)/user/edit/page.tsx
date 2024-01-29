"use client";

import {
    LockOutlined,
    MailOutlined,
    ReadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import AppFrame from "@app/_component/AppFrame";
import WithAuth from "@app/_hoc/WithAuth";
import Menu from "@components/sider/Menu";
import useNotice from "@hooks/notice/notice";
import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { TUser } from "@t/user.type";
import { Button, Card, Form, Input, Tabs } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function Edit({ user }) {
    const router = useRouter();
    const pathname = usePathname();
    const { errorHandler, contextHolder } = useNotice();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            username: user.username,
            description: user.description,
            email: user.email,
            avatar: user.avatar,
            password: null,
        });
    }, [user]);

    const handleFinish = async (values: TUser): Promise<void> => {
        try {
            await UserRepo.editProfile(user.id, values);
            router.push("/user/detail");
        } catch (err) {
            errorHandler(err);
        }
    };

    return (
        <>
            {contextHolder}
            <AppFrame
                menu={<Menu user={user} />}
                header={<div>사용자 정보 수정</div>}
            >
                <Tabs
                    activeKey={pathname as string}
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
                <Card className={cn("p-4", "m-4", "max-w-[480px]")}>
                    <Form
                        name="normal_login"
                        form={form}
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "사용자 이름을 입력해 주세요.",
                                },
                            ]}
                        >
                            <Input
                                disabled
                                prefix={<MailOutlined />}
                                placeholder="이메일"
                            />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "비밀번호를 입력해 주세요.",
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="사용자 이름"
                            />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[
                                {
                                    message: "자기 소개를 입력해 주세요.",
                                },
                            ]}
                        >
                            <Input
                                prefix={<ReadOutlined />}
                                placeholder="사용자 소개"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "비밀번호를 입력해 주세요.",
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="비밀번호"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                변경하기
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </AppFrame>
        </>
    );
}

export default WithAuth(Edit);
