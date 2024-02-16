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

const initErrorState = {
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
    const { userEmail, remember, forget, checked, setChecked } =
        useLoginRemember();
    const [email, setEmail] = useState<string>(userEmail || "");
    const [username, setUsername] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [codeSent, setCodeSent] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [error, setError] = useState<TUserSignupField>(initErrorState);
    const [codeExpireDate, setCodeExpireDate] = useState<Date | null>(null);
    const [codeExpirationMsg, setCodeExpirationMsg] = useState<string>("");
    const [isExpired, setIsExpired] = useState<boolean>(false);

    const handleCodeSend = useCallback(async () => {
        if (!email) {
            setError(prev => ({ ...prev, email: "이메일을 입력해 주세요." }));
            return;
        }
        if (!emailValidation(email)) {
            setError(prev => ({
                ...prev,
                email: "이메일 형식을 확인해 주세요.",
            }));
            return;
        }

        UserRepo.authCode(email)
            .then(() => {
                setCodeSent(true);
                setCodeExpireDate(new Date(Date.now() + 1000 * 60 * 5));
            })
            .catch(err => {
                errorHandler(err);
            });
    }, [email, setCodeSent, setCodeExpireDate, errorHandler]);

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
    }, [codeExpireDate, setCodeExpireDate, setCodeExpirationMsg, setIsExpired]);

    useEffect(() => {
        setError(prev => ({ ...prev, email: "" }));
    }, [email, setError]);

    useEffect(() => {
        setError(prev => ({ ...prev, username: "" }));
    }, [username, setError]);

    useEffect(() => {
        setError(prev => ({ ...prev, code: "" }));
    }, [code, setError]);

    useEffect(() => {
        setError(prev => ({ ...prev, password: "" }));
    }, [password, setError]);

    useEffect(() => {
        setError(prev => ({ ...prev, passwordConfirm: "" }));
    }, [passwordConfirm, setError]);

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
    }, [router]);

    const fieldValidations = useCallback((): TFieldValidation | null => {
        const isRequired = v => !!v;

        const fields: TFieldValidation[] = [
            {
                value: username,
                field: "username",
                condition: isRequired,
                msg: "사용자 이름을 입력해 주세요.",
            },
            {
                value: code,
                field: "code",
                condition: isRequired,
                msg: "인증 코드를 입력해 주세요.",
            },
            {
                value: code,
                field: "code",
                condition: v => String(v).length === 6,
                msg: "인증 번호를 확인해 주세요.",
            },
            {
                value: password,
                field: "password",
                condition: isRequired,
                msg: "비밀번호를 입력해 주세요.",
            },
            {
                value: passwordConfirm,
                field: "passwordConfirm",
                condition: isRequired,
                msg: "비밀번호 확인을 입력해 주세요.",
            },
            {
                value: passwordConfirm,
                field: "passwordConfirm",
                condition: (v: string) => v === password,
                msg: "비밀번호가 일치하지 않습니다.",
            },
        ];

        return (
            fields.find((f: TFieldValidation) => {
                if (f.condition) {
                    return !f.condition(f.value);
                }
                return false;
            }) || null
        );
    }, [email, username, code, password, passwordConfirm]);

    const handleFinish = useCallback(async () => {
        try {
            setError(initErrorState);
            const validation = fieldValidations();
            if (validation) {
                setError(prev => ({
                    ...prev,
                    [validation.field]: validation.msg,
                }));
                return;
            }

            await UserRepo.signup({
                email,
                username,
                code,
                password,
                passwordConfirm,
                avatar: getAvatarUrl(email),
            });

            if (checked) {
                remember(email);
            } else {
                forget();
            }

            router.push("/login");
        } catch (err) {
            errorHandler(err);
        }
    }, [remember, checked, forget, router, fieldValidations, errorHandler]);

    return (
        <>
            {contextHolder}
            <div className={cn("flex", "flex-col", "gap-6", "mb-2")}>
                <FieldInput
                    value={email}
                    disabled={codeSent}
                    placeholder="이메일"
                    error={error.email}
                    icon={<MailOutlined />}
                    onChange={e => setEmail(e.target.value.trim())}
                />
                {codeSent ? (
                    <>
                        <FieldInput
                            value={username}
                            placeholder="사용자 이름"
                            error={error.username}
                            icon={<UserOutlined />}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <FieldInput
                            value={code}
                            placeholder="인증 코드"
                            error={error.code}
                            icon={<SafetyCertificateOutlined />}
                            onChange={e => setCode(e.target.value.trim())}
                        />
                        <FieldInput
                            value={password}
                            placeholder="비밀번호"
                            type="password"
                            error={error.password}
                            icon={<LockOutlined />}
                            onChange={e => setPassword(e.target.value.trim())}
                        />
                        <FieldInput
                            value={passwordConfirm}
                            placeholder="비밀번호 확인"
                            type="password"
                            error={error.passwordConfirm}
                            icon={<LockOutlined />}
                            onChange={e =>
                                setPasswordConfirm(e.target.value.trim())
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
