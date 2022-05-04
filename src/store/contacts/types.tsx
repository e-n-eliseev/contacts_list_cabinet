import { IContact } from "../../components/types/types";


export interface IContactsState {
    contacts: IContact[];
    filteredContacts: IContact[];
    loading: boolean;
    error: null | string;
    authId: string | undefined
}

export enum ContactsActionTypes {
    ACTION_FB_CONTACT = "CONTACTS::ACTION_FB_CONTACT",
    LOAD_CONTACT = "CONTACTS::LOAD_CONTACT",
    LOADED_CONTACT = "CONTACTS::LOADED_CONTACT",
    ERROR_CONTACT = "CONTACTS::ERROR_CONTACT",
    DELETE_CONTACT = "CONTACTS::DELETE_CONTACT",
    CHANGE_CONTACT = "CONTACTS::CHANGE_CONTACT",
    FILTER_CONTACT = "CONTACTS::FILTER_CONTACT",
    RESET_FILTER_CONTACT = "CONTACTS::RESET_FILTER_CONTACT"
}
interface IActionFB {
    type: ContactsActionTypes.ACTION_FB_CONTACT
}
interface ILoadContact {
    type: ContactsActionTypes.LOAD_CONTACT
}
interface ILoadedContact {
    type: ContactsActionTypes.LOADED_CONTACT,
    data: IContact[]
}
interface IErrorContact {
    type: ContactsActionTypes.ERROR_CONTACT;
    data: string
}
interface IDeleteContact {
    type: ContactsActionTypes.DELETE_CONTACT;
    data: string
}
interface IChangeContact {
    type: ContactsActionTypes.CHANGE_CONTACT;
    data: IContact
}
interface IFilterContact {
    type: ContactsActionTypes.FILTER_CONTACT;
    param: string,
    data: string
}
interface IResetFilterContact {
    type: ContactsActionTypes.RESET_FILTER_CONTACT;
}


export type ContactAction =
    ILoadContact
    | ILoadedContact
    | IErrorContact
    | IDeleteContact
    | IChangeContact
    | IFilterContact
    | IResetFilterContact
    | IActionFB