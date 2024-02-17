"use client";

import UserRepo from "@repos/User";
import { emitUserLogin, emitUserLogout } from "@socket/user";
import { TGeneralUser } from "@t/user.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WithAuth(WrappedComponent) {
    return function ChildComponent(props) {
        const router = useRouter();

        const [user, setUser] = useState({
            email: "",
            username: "",
        } as TGeneralUser);

        useEffect(() => {
            (async () => {
                try {
                    const loginUser = await UserRepo.init();
                    emitUserLogin(loginUser);
                    setUser(loginUser);
                } catch (err) {
                    router.push("/login");
                }
            })();
            return () => {
                emitUserLogout(user);
            };
        }, []);

        return <WrappedComponent {...props} user={user} />;
    };
}
