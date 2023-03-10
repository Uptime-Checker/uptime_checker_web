export enum LoginProvider {
  Email = 1,
  Google,
  Github,
  MAINTENANCE,
}

export const GetLoginProvider = (provider: string): LoginProvider => {
  switch (provider) {
    case 'google':
      return LoginProvider.Google;
    case 'github':
      return LoginProvider.Github;
    default:
      return LoginProvider.Email;
  }
};
