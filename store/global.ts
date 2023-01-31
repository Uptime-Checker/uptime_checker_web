import { atomWithImmer } from 'jotai-immer';
import { OrganizationUser, User } from 'models/user';

// This atom is used in the sidebar, so be careful to add more items to this type
type GlobalAtom = {
  sidebar: boolean;
  currentUser: null | User;
  organizations: OrganizationUser[];
};

let globalAtomInit: GlobalAtom = {
  sidebar: false,
  currentUser: null,
  organizations: [],
};

export const globalAtom = atomWithImmer(globalAtomInit);
