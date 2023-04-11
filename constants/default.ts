export const SESSION_STATUS_AUTHENTICATED = 'authenticated';

export const AWS_REGION = 'us-west-1';

export const getDefaultFromEmail = () => {
  return `no-reply@${process.env.HOST!}`;
};

export const NODE_ENV_DEV = 'development';
export const NODE_ENV_PROD = 'production';

export const STRIPE_API_VERSION = '2022-11-15';

export const ProviderNameGoogle = 'google';
export const ProviderNameGithub = 'github';

export const AuthSchemeJWT = 'jwt';

export const SessionTokenExpirationInDays = 180;
