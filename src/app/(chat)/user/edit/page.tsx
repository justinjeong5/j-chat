"use client";

import {
    LockOutlined,
    MailOutlined,
    ReadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import WithAuth from "@app/_hoc/WithAuth";
import FieldInput from "@components/form/FieldInput";
import useNotice from "@hooks/notice";
import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { TUser, TUserEditField } from "@t/user.type";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const initFormData = {
    email: "",
    username: "",
    description: "",
    password: "",
};

type TFieldValidation = {
    value: string;
    field: string;
    condition?: (v: string) => boolean;
    msg: string;
};

function UserEditPage({ user }: { user: TUser }) {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();

    const [formData, setFormData] = useState<TUserEditField>({
        email: user.email as string,
        username: user.username as string,
        description: user.description || "",
        password: "",
    });
    const [error, setError] = useState<TUserEditField>(initFormData);

    const fieldValidations = useCallback((): TFieldValidation | null => {
        const isRequired = v => !!v;

        const validators: TFieldValidation[] = [
            {
                value: formData.username,
                field: "username",
                condition: isRequired,
                msg: "사용자 이름을 입력해 주세요.",
            },
            {
                value: formData.password,
                field: "password",
                condition: isRequired,
                msg: "비밀번호를 입력해 주세요.",
            },
        ];

        return (
            validators.find((f: TFieldValidation) => {
                if (f.condition) {
                    return !f.condition(f.value);
                }
                return false;
            }) || null
        );
    }, [formData]);

    const handleChange = useCallback((field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleFinish = useCallback(async (): Promise<void> => {
        try {
            setError(initFormData);
            const validation = fieldValidations();
            if (validation) {
                setError(prev => ({
                    ...prev,
                    [validation.field]: validation.msg,
                }));
                return;
            }

            await UserRepo.editProfile(user.id, formData);
            router.push("/user/detail");
        } catch (err) {
            errorHandler(err);
        }
    }, [user.id, formData]);

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email as string,
                username: user.username as string,
                description: user.description || "",
                password: "",
            });
        }
    }, [user]);

    return (
        <>
            {contextHolder}
            <Card className={cn("p-4", "m-4", "max-w-[480px]")}>
                <div className={cn("flex", "flex-col", "gap-6", "mb-2")}>
                    <FieldInput
                        value={formData.email as string}
                        disabled
                        icon={<MailOutlined />}
                    />

                    <FieldInput
                        value={formData.username}
                        placeholder="사용자 이름"
                        error={error.username}
                        icon={<UserOutlined />}
                        onChange={e => handleChange("username", e.target.value)}
                    />
                    <FieldInput
                        value={formData.description}
                        placeholder="소개"
                        error={error.description}
                        icon={<ReadOutlined />}
                        onChange={e =>
                            handleChange("description", e.target.value)
                        }
                    />
                    <FieldInput
                        value={formData.password}
                        placeholder="비밀번호"
                        type="password"
                        error={error.password}
                        icon={<LockOutlined />}
                        onChange={e =>
                            handleChange("password", e.target.value.trim())
                        }
                    />
                    <Button
                        className={cn("bg-[#1677FF]", "w-fit", "self-end")}
                        type="primary"
                        onClick={handleFinish}
                    >
                        수정하기
                    </Button>
                </div>
            </Card>
        </>
    );
}

export default WithAuth(UserEditPage);
