import { IContact } from "../../components/types/types";
import { IContactsState } from "./types";
//селектор отфильтрованного списка контактов
export const getContacts = (state: IContactsState): IContact[] => state.filteredContacts;
//селектор состояния загрузки
export const getLoading = (state: IContactsState): boolean => state.loading;
//селектор состояния ошибки
export const getError = (state: IContactsState): string | null => state.error;