import { IContact, IContactFilter } from "../../types/types";


export interface IContactsState {
    contacts: IContact[];
    filteredContacts: IContact[];
    loading: boolean;
    error: null | string;
}

export enum ContactsActionTypes {
    ADD_CONTACT = "CONTACTS::ADD_CONTACT",
    LOAD_CONTACT = "CONTACTS::LOAD_CONTACT",
    LOADED_CONTACT = "CONTACTS::LOADED_CONTACT",
    ERROR_CONTACT = "CONTACTS::ERROR_CONTACT",
    DELETE_CONTACT = "CONTACTS::DELETE_CONTACT",
    CHANGE_CONTACT = "CONTACTS::CHANGE_CONTACT",
    FILTER_CONTACT = "CONTACTS::FILTER_CONTACT"
}
interface IAddContact {
    type: ContactsActionTypes.ADD_CONTACT,
    data: IContact
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
    param: IContactFilter
}
interface IChangeContact {
    type: ContactsActionTypes.CHANGE_CONTACT;
    data: IContact
}
interface IFilterContact {
    type: ContactsActionTypes.FILTER_CONTACT;
    param: IContactFilter,
    data: string
}


export type ContactAction =
    IAddContact
    | ILoadContact
    | ILoadedContact
    | IErrorContact
    | IDeleteContact
    | IChangeContact
    | IFilterContact