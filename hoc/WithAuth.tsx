import useLogin from "hooks/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function WithAuth(WrappedComponent) {
    return function ChildComponent(props) {
        const router = useRouter();
        const { init } = useLogin();

        useEffect(() => {
            (async () => {
                try {
                    const ok = await init();
                    if (ok) {
                        router.push("/");
                    }
                } catch (err) {
                    router.push("/login");
                }
            })();
        }, []);

        return <WrappedComponent {...props} />;
    };
}
