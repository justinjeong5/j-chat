import { Button, Form, Input } from "antd";
import WithAuth from "hoc/WithAuth";
import useLogin from "hooks/login";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserRepo from "repos/User";
import styled from "styled-components";
import { TUserField } from "types/user.type";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

function SignUp() {
    const router = useRouter();

    const { isLoggedIn } = useLogin();
    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn]);

    const onFinish = async (values: TUserField) => {
        await UserRepo.signup(values);
        // 유저 등록에 성공 햇으니 로그인 페이지로 이동하라는 안내 해주기
        router.push("/");
    };

    return (
        <Container>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<TUserField>
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<TUserField>
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    );
}

export default WithAuth(SignUp);
