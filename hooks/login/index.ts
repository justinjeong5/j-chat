import { cookies } from "next/headers";
import { useRouter } from "next/router";
import { useState } from "react";
import UserRepo from "repos/User";
import { TUserField } from "types/user.type";

const useLogin = () => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!user);

    const init = () => {
        return UserRepo.init().then(data => {
            if (data) {
                setUser(data);
                setIsLoggedIn(!!data);
            }
            return data;
        });
    };

    const login = (userField: TUserField) => {
        return UserRepo.login(userField).then(() => {
            setIsLoggedIn(true);
        });
    };

    const logout = () => {
        cookies().delete("j_chat_access_token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    return {
        isLoggedIn,
        init,
        login,
        logout,
    };
};

export default useLogin;
