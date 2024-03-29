"use client";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import useLoginRemember from "@hooks/login/remember";
import useNotice from "@hooks/notice";
import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { TUserField } from "@t/user.type";
import { Button, Checkbox, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Login() {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();
    const { userEmail, remember, forget, checked, setChecked } =
        useLoginRemember();
    const [form] = Form.useForm();

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

    const handleFinish = async (values: TUserField): Promise<void> => {
        try {
            await UserRepo.login(values);
            if (checked) {
                remember(values.email);
            } else {
                forget();
            }

            router.push("/");
        } catch (err) {
            errorHandler(err);
        }
    };

    const handleRemember = (e: CheckboxChangeEvent): void => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        if (!checked) {
            form.setFieldsValue({
                remember: false,
                email: userEmail,
            });
            return;
        }
        form.setFieldsValue({
            remember: true,
            email: userEmail,
        });
    }, []);

    return (
        <>
            {contextHolder}
            <Form name="normal_login" form={form} onFinish={handleFinish}>
                <Form.Item<TUserField>
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "이메일을 입력해 주세요.",
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="이메일" />
                </Form.Item>
                <Form.Item<TUserField>
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
                    <div className={cn("flex", "justify-between")}>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox onChange={handleRemember}>
                                아이디 기억하기
                            </Checkbox>
                        </Form.Item>

                        <a href="/signup">비밀번호 찾기</a>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button
                        className={cn("bg-[#1677FF]", "w-full")}
                        type="primary"
                        htmlType="submit"
                    >
                        로그인하기
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        className={cn("w-full")}
                        onClick={() => router.push("/signup")}
                    >
                        회원가입 하기
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;
