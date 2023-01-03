import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';

import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
let connection: DocumentClient | null = null;

const env = envUtil.getEnv();

const getDynamoDBClient = (): DocumentClient => {
  if (connection) {
    return connection;
  }
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      ...env.aws,
      ...env.awsDatabase,
    });
  } else {
    connection = new AWS.DynamoDB.DocumentClient();
  }
  return connection;
};

export default getDynamoDBClient;
