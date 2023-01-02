import { emailDtoCreators } from '@dto-creators';
import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';

import type { IMail } from '@dto';

const { mailer, aws } = envUtil.getEnv();
const sesClient = new AWS.SES({ ...aws, apiVersion: mailer.apiVersion });

const sendEmail = async (message: IMail) => {
  const email = emailDtoCreators.createAwsEmail(message);
  return sesClient.sendEmail(email).promise();
};

const mailingService = { sendEmail };

export default mailingService;
