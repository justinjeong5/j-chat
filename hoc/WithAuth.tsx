import LottieLayout from "components/layout/LottieLayout";
import useLogin from "hooks/login";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
import lottieAnimation from "public/lottie.json";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TUser } from "types/user.type";

const StyledLottie = styled(Lottie)`
    max-width: 480px;
`;

export default function WithAuth(WrappedComponent) {
    return function ChildComponent(props) {
        const router = useRouter();
        const { init } = useLogin();

        const [user, setUser] = useState({ email: "", username: "" } as TUser);

        useEffect(() => {
            (async () => {
                try {
                    const loginUser = await init();
                    setUser(loginUser);
                } catch (err) {
                    router.push("/login");
                }
            })();
        }, []);

        if (!user.email) {
            return (
                <LottieLayout>
                    <StyledLottie animationData={lottieAnimation} loop />
                </LottieLayout>
            );
        }
        return <WrappedComponent {...props} user={user} />;
    };
}
