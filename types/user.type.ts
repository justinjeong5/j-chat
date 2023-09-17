export type TUser = {
    id: string;
    email: string;
    username: string;
    avatar: URL;
};

export default interface IUser extends TUser {}

export type TUserField = {
    email: string;
    password: string;
};
