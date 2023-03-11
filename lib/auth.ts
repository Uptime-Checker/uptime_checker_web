import { ProviderNameGithub, ProviderNameGoogle } from 'constants/default';

export enum LoginProvider {
  Email = 1,
  Google,
  Github,
}

export const GetLoginProvider = (provider: string): LoginProvider => {
  switch (provider) {
    case ProviderNameGoogle:
      return LoginProvider.Google;
    case ProviderNameGithub:
      return LoginProvider.Github;
    default:
      return LoginProvider.Email;
  }
};
