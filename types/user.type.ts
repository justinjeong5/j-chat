export type TUser = {
    id?: string;
    role?: string;

    email?: string;
    username?: string;
    password?: string;

    description?: string;
    avatar?: string;

    rooms?: Array<object>;
    dialog?: Array<object>;
    likes?: Array<object>;
    comments?: Array<object>;
    stars?: Array<object>;

    lastLogin?: Date;
    updatedAt?: Date;
    createdAt?: Date;
};

export default interface IUser extends TUser {}

export type TUserField = {
    email: string;
    password: string;
};
