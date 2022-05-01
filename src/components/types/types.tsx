import { FormEventHandler, ReactNode, ReactFragment } from 'react';

export interface IAuthProps {
    authed?: boolean;
}

export interface ISubmit {
    onSubmit: ({ login, pass }: ILogIn) => Promise<void>;
}

type ReactChild = ReactNode | ReactFragment;

export interface IContactItem {
    isAddForm?: boolean;
    item?: IContact
}

export interface IForm {
    children: ReactChild,
    onSubmit: FormEventHandler
}

export interface ILogIn {
    login: string,
    pass: string
}
export interface IContact {
    id?: string;
    idFb?: string;
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

