import { User } from '../models/user';

export let CurrentUser: User | null = null;

export const setCurrentUser = (user: User) => {
  CurrentUser = user;
};
