import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/contacts/contactsReducer";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
