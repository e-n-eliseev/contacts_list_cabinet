import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/contacts/contactsReducer";
//типизированный хук селектора
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
