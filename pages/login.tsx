import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import useLogin from "lib/login";
import useRemember from "lib/login/remember";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

const CardWrapper = styled(Card)`
    width: 500px;
`;
const SpaceWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default function Login() {
    const router = useRouter();

    const { userEmail, remember, forget, checked, setChecked } = useRemember();
    const { isLoggedIn, login } = useLogin();
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn]);

    const handleFinish = (values: any) => {
        login(values.email, values.password);
        if (checked) {
            remember(values.email);
        } else {
            forget();
        }
    };

    const handleRemember = (e: CheckboxChangeEvent) => {
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

    type FieldType = {
        email?: string;
        password?: string;
    };

    return (
        <Container>
            <CardWrapper>
                <Form
                    name="normal_login"
                    initialValues={initialValues}
                    onFinish={handleFinish}
                >
                    <Form.Item<FieldType>
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "이메일을 입력해 주세요.",
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <SpaceWrapper>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox onChange={handleRemember}>
                                    Remember me
                                </Checkbox>
                            </Form.Item>

                            <a href="/signup">Forgot password</a>
                        </SpaceWrapper>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%" }}
                        >
                            Log in
                        </Button>
                        Or <a href="/signup">register now!</a>
                    </Form.Item>
                </Form>
            </CardWrapper>
        </Container>
    );
}
