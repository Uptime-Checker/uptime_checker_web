import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const resendEmail = async (fromAddress: string, toAddress: string, subject: string, emailHtml: string) => {
  await resend.emails.send({ from: fromAddress, to: toAddress, subject: subject, html: emailHtml });
};
