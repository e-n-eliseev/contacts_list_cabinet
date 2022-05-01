import { onValue, push } from "firebase/database";
import { auth, getContactsListRefById } from "../../services/firebase";
// import { auth, getContactRefById } from "../../services/firebase";
// import { ContactAction, ContactsActionTypes, IContactsState } from "./types";

import { IContact } from "../../types/types"


// // interface IAddContact {
// //     type: ContactsActionTypes.ADD_CONTACT,
// //     data: IContact
// // }
// // interface ILoadContact {
// //     type: ContactsActionTypes.LOAD_CONTACT
// // }
// // interface ILoadedContact {
// //     type: ContactsActionTypes.LOADED_CONTACT,
// //     data: IContact[]
// // }
// // interface IErrorContact {
// //     type: ContactsActionTypes.ERROR_CONTACT;
// //     data: string
// // }
// // interface IDeleteContact {
// //     type: ContactsActionTypes.DELETE_CONTACT;
// //     param: IContactFilter
// // }
// // interface IChangeContact {
// //     type: ContactsActionTypes.CHANGE_CONTACT;
// //     data: IContact
// // }
// // interface IFilterContact {
// //     type: ContactsActionTypes.FILTER_CONTACT;
// //     param: IContactFilter,
// //     data: string
// // }


// // export type ContactAction =
// //     IAddContact
// //     | ILoadContact
// //     | ILoadedContact
// //     | IErrorContact
// //     | IDeleteContact
// //     | IChangeContact
// //     | IFilterContact

// const addNewMessage = (message, chatId, author, messageId) => ({
//     type: ADD_MESSAGE,
//     message,
//     chatId,
//     author,
//     messageId
// })

// export const addMessage = (chatId, messageId, { text: message, author }) => async dispatch => {
//     dispatch(addNewMessage(message, chatId, author, messageId));
// }

// export const deleteListOfMessage = (chatId) => {
//     return {
//         type: DELETE_LIST,
//         chatId
//     }
// }

// let unsubscribe: () => void;

// export const initMessagesTrack = (id) => (dispatch) => {
//     const unsubscribeMessages = onValue(getMsgsRefById(id), (snapshot) => {
//         const val = snapshot.val();
//         const messageIdArr = Object.keys(val?.messageList || {});
//         messageIdArr.forEach(item => {
//             dispatch(addMessage(id, item, val.messageList[item]));
//         })
//     });

//     unsubscribe = () => {
//         unsubscribeMessages();
//     };
// };

// export const stopMessagesTrack = () => () => {
//     unsubscribe();
// };

export const addContactFB = ({ id, name, surname, phone, email }: IContact) => (): void => {
    push(getContactsListRefById(auth.currentUser?.uid as string), {
        id,
        name,
        surname,
        phone,
        email
    })
}
