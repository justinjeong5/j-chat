export type TUserId = string;

export type TRole = ("common" | "admin")[];

export type TGeneralUser = {
    id: TUserId;
    role?: TRole;

    email?: string;
    username?: string;
    description?: string;
    avatar?: string;

    lastLogin?: Date;
    updatedAt?: Date;
    createdAt?: Date;
    active?: boolean;
};

export type TUser = {
    password?: string;

    rooms?: Array<object>;
    dialog?: Array<object>;
    likes?: Array<object>;
    comments?: Array<object>;
    stars?: Array<object>;
} & TGeneralUser;

export default interface IUser extends TUser {}

export type TUserField = {
    email: string;
    password: string;
};

export type TUserSignupField = {
    username: string;
    code: string;
    passwordConfirm: string;
    avatar?: string;
} & TUserField;

export type TUserEditField = {
    username: string;
    description: string;
    avatar?: string;
} & TUserField;

export type TTypingUser = {
    id: TUserId;
    username: string;
};
