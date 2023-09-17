import Cookies from "js-cookie";
import { useRouter } from "next/router";
import UserRepo from "repos/User";
import { TUserField } from "types/user.type";

const useLogin = () => {
    const router = useRouter();

    const init = () => UserRepo.init();

    const signup = (user: TUserField) => UserRepo.signup(user);

    const login = (userField: TUserField) => {
        const { email, password } = userField;
        return UserRepo.login({ email, password });
    };

    const logout = () => {
        Cookies.remove("j_chat_access_token");
        router.reload();
    };

    return {
        init,
        signup,
        login,
        logout,
    };
};

export default useLogin;
