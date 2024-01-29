"use client";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import useLogin from "@hooks/login";
import useRemember from "@hooks/login/remember";
import useNotice from "@hooks/notice/notice";
import { cn } from "@lib/utils";
import { TUserField } from "@t/user.type";
import { Button, Checkbox, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Login() {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();
    const { userEmail, remember, forget, checked, setChecked } = useRemember();
    const { init, login } = useLogin();
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            try {
                const user = await init();
                if (user) {
                    router.push("/");
                }
                // eslint-disable-next-line no-empty
            } catch (err) {}
        })();
    }, []);

    const handleFinish = async (values: TUserField): Promise<void> => {
        try {
            const ok = await login(values);
            if (checked) {
                remember(values.email);
            } else {
                forget();
            }
            if (ok) {
                router.push("/");
            }
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
                    또는 <a href="/signup">회원 가입</a>하기
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;
