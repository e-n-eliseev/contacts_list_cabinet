import { IContact } from "../../types/types";
import { IContactsState } from "./types";

export const getContacts = (id: string) => (state: IContactsState): IContact[] => state.contacts;