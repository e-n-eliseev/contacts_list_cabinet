import { IContact } from "../../types/types";
import { ContactAction, ContactsActionTypes, IContactsState } from "./types";

const initialState: IContactsState = {
    filteredContacts: [],
    contacts: [],
    loading: false,
    error: null
}

const contactsReducer = (state = initialState, action: ContactAction): IContactsState => {
    switch (action.type) {
        case ContactsActionTypes.CHANGE_CONTACT:
            const itemNumberContacts = state.contacts.findIndex(item => item.id === action.data.id);
            const itemNumberFilteredContacts = state.filteredContacts.findIndex(item => item.id === action.data.id);
            const changedFilteredContacts = [...state.filteredContacts];
            if (itemNumberFilteredContacts !== -1) {
                changedFilteredContacts.splice(itemNumberFilteredContacts, 1, { ...action.data })
            }
            const changedContacts = [...state.contacts];
            changedContacts.splice(itemNumberContacts, 1, { ...action.data })
            return {
                ...state,
                contacts: changedContacts,
                filteredContacts: changedFilteredContacts
            }
        case ContactsActionTypes.DELETE_CONTACT:
            return {
                ...state,
                filteredContacts: state.contacts.filter(item => item.idFb !== action.data),
                contacts: state.contacts.filter(item => item.idFb !== action.data)
            };
        case ContactsActionTypes.ERROR_CONTACT:
            return {
                ...state,
                loading: false,
                error: action.data
            };
        case ContactsActionTypes.FILTER_CONTACT:
            console.log(action.param)
            return {
                ...state,
                filteredContacts: state.contacts.filter(item => item[action.param as keyof IContact]?.includes(action.data))
            };
        case ContactsActionTypes.RESET_FILTER_CONTACT:
            return {
                ...state,
                filteredContacts: state.contacts.slice()
            };
        case ContactsActionTypes.LOAD_CONTACT:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ContactsActionTypes.LOADED_CONTACT:
            return {
                ...state,
                loading: false,
                filteredContacts: action.data,
                contacts: action.data
            };
        default:
            return state;
    }

}

export default contactsReducer;
export type RootState = ReturnType<typeof contactsReducer>