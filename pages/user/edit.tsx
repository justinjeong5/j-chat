import {
    LockOutlined,
    MailOutlined,
    ReadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, Tabs } from "antd";
import AppFrame from "components/layout/AppFrame";
import Menu from "components/sider/Menu";
import WithAuth from "hoc/WithAuth";
import useNotice from "hooks/notice/notice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserRepo from "repos/User";
import styled from "styled-components";
import { TUser } from "types/user.type";

const CardWrapper = styled(Card)`
    padding: 1rem;
    margin: 1rem;
    max-width: 480px;
`;

function Edit({ user }) {
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
            <AppFrame
                menu={<Menu user={user} />}
                header={<div>사용자 정보 수정</div>}
            >
                <Tabs
                    activeKey={router.pathname}
                    type="card"
                    onTabClick={key => router.push(key)}
                    items={[
                        {
                            label: "회원 정보",
                            key: "/user/detail",
                        },
                        {
                            label: "정보 수정",
                            key: "/user/edit",
                        },
                        {
                            label: "참여 내역",
                            key: "/user/history",
                        },
                    ]}
                />
                <CardWrapper>
                    <Form
                        name="normal_login"
                        form={form}
                        onFinish={handleFinish}
                    >
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
                </CardWrapper>
            </AppFrame>
        </>
    );
}

export default WithAuth(Edit);
