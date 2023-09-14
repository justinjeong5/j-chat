import useLogin from "hooks/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function WithAuth(WrappedComponent) {
    return function ChildComponent(props) {
        const router = useRouter();
        const { init } = useLogin();

        useEffect(() => {
            (async () => {
                const user = await init();
                if (user) {
                    router.replace("/");
                }
            })();
        }, []);

        return <WrappedComponent {...props} />;
    };
}
