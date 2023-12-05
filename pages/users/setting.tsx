import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import WithAuth from "hoc/WithAuth";
import useNotice from "hooks/notice/notice";
import { useRouter } from "next/router";
import { useMemo } from "react";
import UsersRepo from "repos/Users";
import styled from "styled-components";
import { TUser } from "types/user.type";

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

function Setting({ user }) {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();

    const handleFinish = async (values: TUser): Promise<void> => {
        try {
            const ok = await UsersRepo.patch(values);
            if (ok) {
                router.push("/");
            }
        } catch (err) {
            errorHandler(err);
        }
    };

    const initialValues = useMemo(() => {
        return {
            email: user.email,
            username: user.username,
            avatar: user.avatar,
        };
    }, [user]);

    return (
        <>
            {contextHolder}
            <Container>
                <CardWrapper>
                    <Form
                        name="normal_login"
                        initialValues={initialValues}
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "이메일을 입력해 주세요.",
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="이메일"
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
                </CardWrapper>
            </Container>
        </>
    );
}

export default WithAuth(Setting);
