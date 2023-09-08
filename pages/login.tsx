import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import useLogin from "hooks/login";
import useRemember from "hooks/login/remember";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { TUserField } from "types/user";

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

    const handleFinish = (values: TUserField): void => {
        login(values.email, values.password);
        if (checked) {
            remember(values.email);
        } else {
            forget();
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
        <Container>
            <CardWrapper>
                <Form
                    name="normal_login"
                    initialValues={initialValues}
                    onFinish={handleFinish}
                >
                    <Form.Item<TUserField>
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
                        <SpaceWrapper>
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
                        </SpaceWrapper>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%" }}
                        >
                            로그인하기
                        </Button>
                        또는 <a href="/signup">회원 가입</a>하기
                    </Form.Item>
                </Form>
            </CardWrapper>
        </Container>
    );
}
