import { onValue, push, remove, set } from "firebase/database";
import { auth, getContactListRefById, getContactsRefById, getContactsListRefById } from "../../services/firebase";
import { ContactAction, ContactsActionTypes } from "./types";
import { ThunkAction } from 'redux-thunk';
import { IContact } from "../../types/types";
import { AnyAction } from 'redux';
import { RootState } from "./contactsReducer";

export const changeContact = (data: IContact): ContactAction => {
    return {
        type: ContactsActionTypes.CHANGE_CONTACT,
        data
    }
}

export const filterContacts = (param: keyof IContact, data: string): ContactAction => {
    return {
        type: ContactsActionTypes.FILTER_CONTACT,
        param,
        data
    }
}

export const resetFilterContacts = (): ContactAction => {
    return {
        type: ContactsActionTypes.RESET_FILTER_CONTACT,
    }
}

export const deleteContact = (data: string): ContactAction => {
    return {
        type: ContactsActionTypes.DELETE_CONTACT,
        data
    }
}

export const loadContacts = (): ContactAction => {
    return {
        type: ContactsActionTypes.LOAD_CONTACT,
    }
}

export const loadedContacts = (data: IContact[]): ContactAction => {
    return {
        type: ContactsActionTypes.LOADED_CONTACT,
        data
    }
}


export const addContactFB = ({ id, name, surname, phone, email }: IContact): ThunkAction<void, RootState, unknown, AnyAction> => () => {
    push(getContactsListRefById(auth.currentUser?.uid as string), {
        id,
        name,
        surname,
        phone,
        email
    })
}

export const changeContactFB = (data: IContact): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
    dispatch(changeContact(data));
    const dataFb = { ...data }
    delete dataFb.idFb
    set(getContactListRefById(auth.currentUser?.uid as string, data?.idFb as string), dataFb);

}

export const deleteContactFB = (id: string): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
    remove(getContactListRefById(auth.currentUser?.uid as string, id));
    dispatch(deleteContact(id));
};

let unsubscribe: () => void;

export const initContactsListTrack = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
    dispatch(loadContacts())
    const unsubscribeContacts = onValue(getContactsRefById(auth.currentUser?.uid as string), (snapshot) => {
        const val = snapshot.val();
        const contactsIdArr: IContact[] = Object.keys(val?.contactsList || {}).reduce((acc: IContact[], item) => {
            acc.push({ ...val.contactsList[item], idFb: item })
            return acc;
        }, []);
        dispatch(loadedContacts(contactsIdArr))
    });

    unsubscribe = () => {
        unsubscribeContacts();
    };
};

export const stopContactsListTrack = () => () => {
    unsubscribe();
};
