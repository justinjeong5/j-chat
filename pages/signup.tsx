import { Button, Form, Input } from "antd";
import useLogin from "hooks/login";
import useNotice from "hooks/notice/notice";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
    const { errorHandler, contextHolder } = useNotice();
    const { init, signup } = useLogin();

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

    const onFinish = async (values: TUserField) => {
        try {
            const user = await signup(values);
            if (user) {
                router.push("/login");
            }
        } catch (err) {
            errorHandler(err);
        }
    };

    return (
        <>
            {contextHolder}
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
                            {
                                required: true,
                                message: "Please input your email!",
                            },
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
        </>
    );
}

export default SignUp;
