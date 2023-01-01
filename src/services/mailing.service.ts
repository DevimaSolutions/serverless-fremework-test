import { emailDtoCreators } from '@dto-creators';
import * as AWS from 'aws-sdk';

import type { IMail } from '@dto';

const sendEmail = async (message: IMail) => {
  const email = emailDtoCreators.createAwsEmail(message);
  return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(email).promise();
};

const mailingService = { sendEmail };

export default mailingService;
