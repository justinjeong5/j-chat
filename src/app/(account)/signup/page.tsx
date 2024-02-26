"use client";

import {
    LockOutlined,
    MailOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from "@ant-design/icons";
import FieldInput from "@components/form/FieldInput";
import useLoginRemember from "@hooks/login/remember";
import useNotice from "@hooks/notice";
import getAvatarUrl from "@lib/get-avatar-url";
import emailValidation from "@lib/string/email-pattern-validation";
import { cn } from "@lib/utils";
import UserRepo from "@repos/User";
import { TUserSignupField } from "@t/user.type";
import { Button, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const FIVE_MINUTES = 1000 * 60 * 5;

const initFormData = {
    email: "",
    username: "",
    code: "",
    password: "",
    passwordConfirm: "",
};

type TFieldValidation = {
    value: string;
    field: string;
    condition?: (v: string) => boolean;
    msg: string;
};

function SignUp() {
    const router = useRouter();
    const { errorHandler, contextHolder } = useNotice();
    const { remember, forget, checked, setChecked } = useLoginRemember();

    const [prevFormData, setPrevFormData] =
        useState<TUserSignupField>(initFormData);
    const [formData, setFormData] = useState<TUserSignupField>(initFormData);
    const [codeSent, setCodeSent] = useState<boolean>(false);
    const [error, setError] = useState<TUserSignupField>(initFormData);
    const [codeExpireDate, setCodeExpireDate] = useState<Date | null>(null);
    const [codeExpirationMsg, setCodeExpirationMsg] = useState<string>("");
    const [isExpired, setIsExpired] = useState<boolean>(false);

    const handleCodeSend = useCallback(() => {
        if (!formData.email) {
            setError(prev => ({ ...prev, email: "이메일을 입력해 주세요." }));
            return;
        }
        if (!emailValidation(formData.email)) {
            setError(prev => ({
                ...prev,
                email: "이메일 형식을 확인해 주세요.",
            }));
            return;
        }

        UserRepo.authCode(formData.email)
            .then(() => {
                setCodeSent(true);
                setCodeExpireDate(new Date(Date.now() + FIVE_MINUTES));
            })
            .catch(err => {
                errorHandler(err);
            });
    }, [formData.email]);

    useEffect(() => {
        if (!codeExpireDate) {
            return;
        }
        const interval = setInterval(() => {
            const diff = Math.floor(
                (codeExpireDate.getTime() - Date.now()) / 1000,
            );
            if (diff <= 0) {
                setCodeExpireDate(null);
                setCodeExpirationMsg("인증 코드가 만료되었습니다.");
                setIsExpired(true);
                clearInterval(interval);
            } else {
                setCodeExpirationMsg(
                    `인증 코드 유효 시간이 ${diff}초 남았습니다.`,
                );
            }
        }, 1000);

        // eslint-disable-next-line consistent-return
        return () => clearInterval(interval);
    }, [codeExpireDate]);

    useEffect(() => {
        setFormData(prev => {
            setPrevFormData(prev);
            return prev;
        });
    }, [formData]);

    useEffect(() => {
        setError(prev => {
            const newErrors = { ...prev };
            Object.keys(formData).forEach(field => {
                if (prevFormData[field] !== formData[field]) {
                    newErrors[field] = "";
                }
            });
            return newErrors;
        });
    }, [formData, prevFormData]);

    useEffect(() => {
        (async () => {
            try {
                const user = await UserRepo.init();
                if (user) {
                    router.push("/");
                }
            } catch (err) {
                /* empty */
            }
        })();
    }, []);

    const handleChange = useCallback((field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

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
                value: formData.code,
                field: "code",
                condition: isRequired,
                msg: "인증 코드를 입력해 주세요.",
            },
            {
                value: formData.code,
                field: "code",
                condition: v => String(v).length === 6,
                msg: "인증 번호를 확인해 주세요.",
            },
            {
                value: formData.password,
                field: "password",
                condition: isRequired,
                msg: "비밀번호를 입력해 주세요.",
            },
            {
                value: formData.passwordConfirm,
                field: "passwordConfirm",
                condition: isRequired,
                msg: "비밀번호 확인을 입력해 주세요.",
            },
            {
                value: formData.passwordConfirm,
                field: "passwordConfirm",
                condition: (v: string) => v === formData.password,
                msg: "비밀번호가 일치하지 않습니다.",
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

    const handleFinish = useCallback(async () => {
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

            await UserRepo.signup({
                ...formData,
                avatar: getAvatarUrl(formData.email),
            });

            if (checked) {
                remember(formData.email);
            } else {
                forget();
            }

            router.push("/login");
        } catch (err) {
            errorHandler(err);
        }
    }, [checked, fieldValidations]);

    return (
        <>
            {contextHolder}
            <div className={cn("flex", "flex-col", "gap-6", "mb-2")}>
                <FieldInput
                    value={formData.email}
                    disabled={codeSent}
                    placeholder="이메일"
                    error={error.email}
                    icon={<MailOutlined />}
                    onChange={e => handleChange("email", e.target.value.trim())}
                />
                {codeSent ? (
                    <>
                        <FieldInput
                            value={formData.username}
                            placeholder="사용자 이름"
                            error={error.username}
                            icon={<UserOutlined />}
                            onChange={e =>
                                handleChange("username", e.target.value)
                            }
                        />
                        <FieldInput
                            value={formData.code}
                            placeholder="인증 코드"
                            error={error.code}
                            icon={<SafetyCertificateOutlined />}
                            onChange={e =>
                                handleChange("code", e.target.value.trim())
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
                        <FieldInput
                            value={formData.passwordConfirm}
                            placeholder="비밀번호 확인"
                            type="password"
                            error={error.passwordConfirm}
                            icon={<LockOutlined />}
                            onChange={e =>
                                handleChange(
                                    "passwordConfirm",
                                    e.target.value.trim(),
                                )
                            }
                        />
                        <div className={cn("flex", "justify-between")}>
                            <div className={cn("text-slate-600")}>
                                {codeExpirationMsg}
                            </div>
                            <Checkbox
                                checked={checked}
                                onChange={e => setChecked(e.target.checked)}
                            >
                                아이디 기억하기
                            </Checkbox>
                        </div>

                        {!isExpired && (
                            <Button
                                className={cn("bg-[#1677FF]", "w-full")}
                                type="primary"
                                onClick={handleFinish}
                            >
                                회원가입 하기
                            </Button>
                        )}
                    </>
                ) : (
                    <Button
                        className={cn("bg-[#1677FF]")}
                        type="primary"
                        onClick={handleCodeSend}
                    >
                        인증 코드 받기
                    </Button>
                )}

                <Button
                    className={cn("w-full")}
                    onClick={() => router.push("/login")}
                >
                    돌아가기
                </Button>
            </div>
        </>
    );
}

export default SignUp;
