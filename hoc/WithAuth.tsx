import { useRouter } from "next/router";
import { useEffect } from "react";
import useLogin from "lib/login";

export default function WithAuth(WrappedComponent) {
    return props => {
        const router = useRouter();
        const { isLoggedIn } = useLogin();

        useEffect(() => {
            if (!isLoggedIn) {
                router.replace("/login");
            }
        }, [isLoggedIn]);

        return <WrappedComponent {...props} />;
    };
}
