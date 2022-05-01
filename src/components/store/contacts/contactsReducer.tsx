import { ContactAction, ContactsActionTypes, IContactsState } from "./types";

const initialState: IContactsState = {
    filteredContacts: [],
    contacts: [],
    loading: false,
    error: null
}

const contactsReducer = (state = initialState, action: ContactAction): IContactsState => {
    switch (action.type) {
        case ContactsActionTypes.ADD_CONTACT:
            const newContacts = [...state.filteredContacts];
            newContacts.push(action.data);
            return {
                ...state,
                filteredContacts: newContacts,
                contacts: newContacts
            }
        case ContactsActionTypes.CHANGE_CONTACT:
            const itemNumber = state.contacts.findIndex(item => item.id === action.data.id)
            return {
                ...state,
                filteredContacts: [...state.filteredContacts,
                state.contacts[itemNumber] = action.data],
                contacts: [...state.contacts,
                state.contacts[itemNumber] = action.data]
            }
        case ContactsActionTypes.DELETE_CONTACT:
            return {
                ...state,
                filteredContacts: state.contacts.filter(item => item.email !== action.param),
                contacts: state.contacts.filter(item => item[action.param] !== action.param)
            };
        case ContactsActionTypes.ERROR_CONTACT:
            return {
                ...state,
                loading: false,
                error: action.data
            };
        case ContactsActionTypes.FILTER_CONTACT:
            return {
                ...state,
                filteredContacts: state.contacts.filter(item => item[action.param] === action.data)
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