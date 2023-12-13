import useLogin from "hooks/login";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TUser } from "types/user.type";

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

        if (user.email === "") {
            return <div>loading...</div>;
        }
        return <WrappedComponent {...props} user={user} />;
    };
}
