import { envUtil } from '@utils';

import type { IMail } from '@dto';
const env = envUtil.getEnv();

const createAwsEmail = (mail: IMail) => ({
  Destination: {
    CcAddresses: [env.mailer.senderEmail],
    ToAddresses: mail.recipients,
  },
  Message: {
    Body: {
      ...(mail.htmlContent
        ? {
            Html: {
              Charset: 'UTF-8',
              Data: mail.htmlContent,
            },
          }
        : {}),
      ...(mail.htmlContent
        ? {
            Text: {
              Charset: 'UTF-8',
              Data: mail.textContent,
            },
          }
        : {}),
    },
    Subject: {
      Charset: 'UTF-8',
      Data: mail.title,
    },
  },
  Source: env.mailer.senderEmail,
  ReplyToAddresses: [env.mailer.senderEmail],
});

const emailCreator = { createAwsEmail };

export default emailCreator;
