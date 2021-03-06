import { onValue, push, remove, set } from "firebase/database";
import { auth, getContactListRefById, getContactsRefById, getContactsListRefById } from "../../services/firebase";
import { ActionFB, ContactAction, ContactsActionTypes } from "./types";
import { ThunkAction } from 'redux-thunk';
import { IContact } from "../../components/types/types";
import { RootState } from "./contactsReducer";

export const changeContact = (data: IContact): ContactAction => ({
    type: ContactsActionTypes.CHANGE_CONTACT,
    data
}
)

export const filterContacts = (param: keyof IContact, data: string): ContactAction => ({
    type: ContactsActionTypes.FILTER_CONTACT,
    param,
    data
}
)

export const resetFilterContacts = (): ContactAction => (
    {
        type: ContactsActionTypes.RESET_FILTER_CONTACT,
    }
)

export const deleteContact = (data: string): ContactAction => (
    {
        type: ContactsActionTypes.DELETE_CONTACT,
        data
    }
)

export const loadContacts = (): ContactAction => (
    {
        type: ContactsActionTypes.LOAD_CONTACT,
    }
)

export const loadedContacts = (data: IContact[]): ContactAction => (
    {
        type: ContactsActionTypes.LOADED_CONTACT,
        data
    }
)

export const errorContacts = (data: string): ContactAction => (
    {
        type: ContactsActionTypes.ERROR_CONTACT,
        data
    }
)

//добавление контакта  в базу
export const addContactFB = ({ id, name, surname, phone, email }: IContact): ActionFB => () => {
    push(getContactsListRefById(auth.currentUser?.uid as string), {
        id,
        name,
        surname,
        phone,
        email
    })
}
//изменение записи в базе
export const changeContactFB = (data: IContact): ActionFB => (dispatch) => {
    dispatch(changeContact(data));
    const dataFb = { ...data }
    delete dataFb.idFb
    set(getContactListRefById(auth.currentUser?.uid as string,
        data?.idFb as string), dataFb);

}
//удаление контакта в базе
export const deleteContactFB = (id: string): ThunkAction<void,
    RootState,
    unknown,
    ContactAction> => (dispatch) => {
        remove(getContactListRefById(auth.currentUser?.uid as string, id));
        dispatch(deleteContact(id));
    };

let unsubscribe: () => void;
//подписка на изменение состояния записей базы
export const initContactsListTrack = (): ActionFB => (dispatch) => {
    dispatch(loadContacts())
    const unsubscribeContacts = onValue(getContactsRefById(auth.currentUser?.uid as string),
        (snapshot) => {
            const val = snapshot.val();
            const contactsIdArr: IContact[] = Object.keys(val?.contactsList || {})
                .reduce((acc: IContact[], item) => {
                    acc.push({ ...val.contactsList[item], idFb: item })
                    return acc;
                }, []);
            dispatch(loadedContacts(contactsIdArr))
        },
        (error) => {
            console.log(error)
            dispatch(errorContacts(error.message))
        }
    );

    unsubscribe = () => {
        unsubscribeContacts();
    };
};
//закрытие подписки на состояние базы контактов
export const stopContactsListTrack = () => () => {
    unsubscribe();
};
