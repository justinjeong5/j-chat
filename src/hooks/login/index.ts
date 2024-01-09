import UserRepo from "@repos/User";
import { TUser, TUserField } from "@t/user.type";
import { useRouter } from "next/navigation";

const useLogin = () => {
    const router = useRouter();

    const init = () => UserRepo.init();

    const signup = (user: TUser) => UserRepo.signup(user);

    const login = (userField: TUserField) => {
        const { email, password } = userField;
        return UserRepo.login({ email, password });
    };

    const logout = async () => {
        await UserRepo.logout();
        router.push("/login");
    };

    return {
        init,
        signup,
        login,
        logout,
    };
};

export default useLogin;
