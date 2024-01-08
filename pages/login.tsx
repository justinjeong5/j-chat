import { LockOutlined, MailOutlined } from "@ant-design/icons";
import useLogin from "@hooks/login";
import useRemember from "@hooks/login/remember";
import useNotice from "@hooks/notice/notice";
import { TUserField } from "@t/user.type";
import { Button, Card, Checkbox, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
const FullWidthButton = styled(Button)`
    width: 100%;
`;

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
            <Container>
                <CardWrapper>
                    <Form
                        name="normal_login"
                        form={form}
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
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="이메일"
                            />
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
                            <FullWidthButton type="primary" htmlType="submit">
                                로그인하기
                            </FullWidthButton>
                            또는 <a href="/signup">회원 가입</a>하기
                        </Form.Item>
                    </Form>
                </CardWrapper>
            </Container>
        </>
    );
}

export default Login;
