import { atomWithImmer } from 'jotai-immer';
import { OrganizationUser, User } from 'models/user';

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
