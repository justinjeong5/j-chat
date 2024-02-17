"use client";

import {
    LockOutlined,
    MailOutlined,
    ReadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import WithAuth from "@app/_hoc/WithAuth";
import useNotice from "@hooks/notice";
import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { TUser } from "@t/user.type";
import { Button, Card, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function UserEditPage({ user }: { user: TUser }) {
    const router = useRouter();
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
            <Card className={cn("p-4", "m-4", "max-w-[480px]")}>
                <Form name="normal_login" form={form} onFinish={handleFinish}>
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
        </>
    );
}

export default WithAuth(UserEditPage);
