import { IContact } from "../../types/types";
import { IContactsState } from "./types";

export const getContacts = (state: IContactsState): IContact[] => state.filteredContacts;
export const getLoading = (state: IContactsState): boolean => state.loading;
export const getError = (state: IContactsState): string | null => state.error;