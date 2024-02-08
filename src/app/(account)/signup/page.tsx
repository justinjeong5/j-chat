"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useRemember from "@hooks/login/remember";
import useNotice from "@hooks/notice";
import getAvatarUrl from "@lib/get-avatar-url";
import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { TUser } from "@t/user.type";
import { Button, Checkbox, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

function SignUp() {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();
    const { userEmail, remember, forget, checked, setChecked } = useRemember();

    useEffect(() => {
        (async () => {
            try {
                const user = await UserRepo.init();
                if (user) {
                    router.push("/");
                }
                // eslint-disable-next-line no-empty
            } catch (err) {}
        })();
    }, []);

    const handleFinish = async (values: TUser) => {
        try {
            const user = await UserRepo.signup({
                ...values,
                avatar: getAvatarUrl(values.email),
            });
            if (checked) {
                remember(values.email as string);
            } else {
                forget();
            }
            if (user) {
                router.push("/login");
            }
        } catch (err) {
            errorHandler(err);
        }
    };

    const handleRemember = (e: CheckboxChangeEvent): void => {
        setChecked(e.target.checked);
    };

    const initialValues = useMemo(() => {
        if (!checked) {
            return {
                remember: false,
                email: null,
            };
        }
        return {
            remember: true,
            email: userEmail,
        };
    }, [checked, userEmail]);

    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                initialValues={initialValues}
                onFinish={handleFinish}
                autoComplete="off"
            >
                <Form.Item<TUser>
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "이메일을 입력해 주세요.",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="이메일" />
                </Form.Item>

                <Form.Item<TUser>
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

                <Form.Item<TUser>
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "사용자 이름을 입력해 주세요.",
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        placeholder="사용자 이름"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox onChange={handleRemember}>
                            아이디 기억하기
                        </Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button
                        className={cn("bg-[#1677FF]", "w-full")}
                        type="primary"
                        htmlType="submit"
                    >
                        회원가입 하기
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default SignUp;
