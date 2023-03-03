export const APP_NAME = 'Uptime Checker';
export const SESSION_STATUS_AUTHENTICATED = 'authenticated';

export const AWS_REGION = 'us-west-1';

export const getDefaultFromEmail = () => {
  return `no-reply@${process.env.HOST!}`;
};
