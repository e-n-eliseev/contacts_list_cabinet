import { ContactAction } from "../../store/contacts/types";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/contacts/contactsReducer";
import { useDispatch } from "react-redux";

export const useTypedDispatch = () => (useDispatch() as ThunkDispatch<RootState, unknown, ContactAction>)