import {
  reminderResponseModel,
  remindersListResponseModel,
  createReminderRequestModel,
  updateReminderRequestModel,
  notFoundErrorModel,
  baseServerErrorModel,
  validationErrorModel,
  baseSuccessModel,
} from '@docs';
import { reminderFunctions, scheduledFunctions } from '@functions';
import { reminderModel } from '@models';
import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';

import type { AWS as awsType } from '@serverless/typescript';

const configData = envUtil.getEnv().aws;

AWS.config.update(configData);

const serverlessConfiguration: awsType = {
  service: 'reminders-api',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
    'serverless-offline',
    'serverless-openapi-documenter',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: 'dev',
    },
    documentation: {
      version: '1',
      title: 'Reminders API',
      description: 'Reminders API',
      models: [
        reminderResponseModel,
        remindersListResponseModel,
        createReminderRequestModel,
        updateReminderRequestModel,
        notFoundErrorModel,
        baseServerErrorModel,
        validationErrorModel,
        baseSuccessModel,
      ],
    },
  },
  functions: { ...reminderFunctions, ...scheduledFunctions },
  package: { individually: true },

  resources: {
    Resources: { ...reminderModel },
  },
};

module.exports = serverlessConfiguration;
