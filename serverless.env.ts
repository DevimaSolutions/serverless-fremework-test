import { envUtil } from '@utils';

const { aws, awsDatabase, recipient, mailer, deployment } = envUtil.getEnv();

export const environment = {
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
  NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

  //Aws global configs
  AWS_VERSION: aws.apiVersion,
  AWS_ACCESS_KEY_ID: aws.accessKeyId,
  AWS_SECRET_ACCESS_KEY: aws.secretAccessKey,
  AWS_REGION: aws.region,

  //Aws database
  AWS_DATABASE_API_VERSION: awsDatabase.apiVersion,
  AWS_DATABASE_ENDPOINT: awsDatabase.endpoint,
  AWS_DATABASE_MIGRATION_OPTION: String(awsDatabase.migrate),

  //Recipient
  RECIPIENT_EMAIL: recipient.recipientEmails.join(','),

  //Mailer config
  SENDER_EMAIL: mailer.senderEmail,
  MAILER_AWS_API_VERSION: mailer.apiVersion,

  //Debugger config
  DEBUG: '*',

  //Deployment
  DOMAIN: deployment.prodDomain,
  DOMAIN_DEV: deployment.devDomain,
  STAGE: deployment.stage,
};
