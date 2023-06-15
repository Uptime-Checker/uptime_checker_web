import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { AWS_REGION } from 'constants/default';

const client = new SESClient({ region: AWS_REGION });
const UTF8 = 'UTF-8';

const createSendEmailCommand = (fromAddress: string, toAddress: string, subject: string, emailHtml: string) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: UTF8,
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: UTF8,
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

export const sendAWSEmail = async (fromAddress: string, toAddress: string, subject: string, emailHtml: string) => {
  const sendEmailCommand = createSendEmailCommand(fromAddress, toAddress, subject, emailHtml);
  return await client.send(sendEmailCommand);
};
