import { atomWithImmer } from 'jotai-immer';
import { OrganizationUser } from 'models/user';

type GlobalAtom = {
  sidebar: boolean;
  organizations: OrganizationUser[];
};

let globalAtomInit: GlobalAtom = {
  sidebar: false,
  organizations: [],
};

export const globalAtom = atomWithImmer(globalAtomInit);
