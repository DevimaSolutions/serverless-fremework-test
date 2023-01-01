import { config } from 'dotenv';

import { envSchema } from './schema';

import type { IEnv } from './env.type';

config();
const mapEnvValues = {
  bool: (envValue: string) => envValue === 'true',
  number: (envValue: string, defaultValue: number) => {
    const value = Number(envValue);

    return Number.isNaN(value) ? defaultValue : value;
  },
  array: (envValue: string, delimiter = ',') => envValue.split(delimiter).filter(Boolean),
  includes: (envValue?: string, values: Array<string> = [], defaultValue?: string) => {
    if (!envValue) {
      return defaultValue ?? '';
    }
    return values.includes(envValue) ? envValue : defaultValue ?? '';
  },
};

const mapEnv = () => {
  const parsed: IEnv = {
    aws: {
      apiVersion: process.env.AWS_API_VERSION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    },
    awsDatabase: {
      apiVersion: process.env.AWS_DATABASE_API_VERSION,
      endpoint: process.env.AWS_DATABASE_ENDPOINT,
    },
    recipient: {
      recipientEmails: mapEnvValues.array(process.env.RECIPIENT_EMAIL ?? ''),
    },
    mailer: {
      senderEmail: process.env.SENDER_EMAIL,
      apiVersion: process.env.MAILER_AWS_API_VERSION,
    },
  };

  return Object.freeze(parsed);
};

let env: IEnv;
export const getEnv = (): Readonly<IEnv> => {
  if (!env) {
    env = mapEnv();
    envSchema.validateSync(env);
  }
  return env;
};
