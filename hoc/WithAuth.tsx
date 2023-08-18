import useLogin from "lib/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function WithAuth(WrappedComponent) {
    return function ChildComponent(props) {
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
