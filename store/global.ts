import { atomWithImmer } from 'jotai-immer';
import { Monitor } from 'models/monitor';
import { Product } from 'models/subscription';
import { OrganizationUser, User } from 'models/user';

// This atom is used in the sidebar, so be careful to add more items to this type
type GlobalAtom = {
  sidebar: boolean;
  currentUser: User | null;
  organizations: OrganizationUser[];
  products: Product[];
};

const globalAtomInit: GlobalAtom = {
  sidebar: false,
  currentUser: null,
  organizations: [],
  products: [],
};

export const globalAtom = atomWithImmer(globalAtomInit);
export const monitorAtom = atomWithImmer<Monitor | null>(null);
