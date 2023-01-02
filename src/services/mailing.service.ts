import { emailDtoCreators } from '@dto-creators';
import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';

import type { IMail } from '@dto';

const env = envUtil.getEnv().mailer;
const sesClient = new AWS.SES({ apiVersion: env.apiVersion });

const sendEmail = async (message: IMail) => {
  const email = emailDtoCreators.createAwsEmail(message);
  return sesClient.sendEmail(email).promise();
};

const mailingService = { sendEmail };

export default mailingService;
