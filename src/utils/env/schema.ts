import { object, array, string, boolean } from 'yup';

import { AwsRegionEnum } from './env.type';

const validationMessage = (field: string, type: string) =>
  `Please enter correct ${field} field type (${type}) in .env file`;

const awsSchema = object().shape({
  apiVersion: string()
    .required(validationMessage('AWS_VERSION', 'string'))
    .typeError(validationMessage('AWS_VERSION', 'string')),
  accessKeyId: string()
    .required(validationMessage('AWS_ACCESS_KEY_ID', 'string'))
    .typeError(validationMessage('AWS_ACCESS_KEY_ID', 'string')),
  secretAccessKey: string()
    .required(validationMessage('AWS_SECRET_ACCESS_KEY', 'string'))
    .typeError(validationMessage('AWS_SECRET_ACCESS_KEY', 'string')),
  region: string()
    .oneOf(Object.values(AwsRegionEnum))
    .required(validationMessage('AWS_REGION', 'string'))
    .typeError(validationMessage('AWS_REGION', 'string')),
});

const awsDatabaseSchema = object().shape({
  apiVersion: string()
    .required(validationMessage('AWS_DATABASE_API_VERSION', 'string'))
    .typeError(validationMessage('AWS_DATABASE_API_VERSION', 'string')),
  endpoint: string()
    .required(validationMessage('AWS_DATABASE_ENDPOINT', 'string'))
    .typeError(validationMessage('AWS_DATABASE_ENDPOINT', 'string')),
  migrate: boolean().default(false),
});

const recipientSchema = object().shape({
  recipientEmails: array()
    .of(string().email())
    .min(1)
    .required(validationMessage('RECIPIENT_EMAIL', 'email string array separated via ","'))
    .typeError(validationMessage('RECIPIENT_EMAIL', 'email string array separated via ","')),
});

const mailerSchema = object().shape({
  senderEmail: string()
    .email()
    .required(validationMessage('SENDER_EMAIL', 'email string'))
    .typeError(validationMessage('SENDER_EMAIL', 'email string')),
  apiVersion: string()
    .required(validationMessage('MAILER_AWS_API_VERSION', 'string'))
    .typeError(validationMessage('MAILER_AWS_API_VERSION', 'string')),
});

const deploymentSchema = object().shape({
  prodDomain: string()
    .required(validationMessage('DOMAIN', 'string'))
    .typeError(validationMessage('DOMAIN', 'string')),
  devDomain: string().typeError(validationMessage('DOMAIN_DEV', 'string')),
  stage: string().oneOf(['dev', 'prod']).required(),
});

export const envSchema = object()
  .shape({
    aws: awsSchema,
    awsDatabase: awsDatabaseSchema,
    recipient: recipientSchema,
    mailer: mailerSchema,
    deployment: deploymentSchema,
  })
  .noUnknown();
