export interface IAuthProps {
    authed?: boolean;
}
export interface ISubmit {
    onSubmit: ({ login, pass }: ILogIn) => Promise<void>;
}
export interface ILogIn {
    login: string,
    pass: string
}
export interface IContact {
    id?: string;
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
}
export enum IContactFilter {
    id = "id",
    name = "name",
    surname = "surname",
    phone = "phone",
    email = "email",
}

