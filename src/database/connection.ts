import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';

import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
let connection: DocumentClient | null = null;

const config = envUtil.getEnv().aws;

AWS.config.update(config);
const getDynamoDBClient = (): DocumentClient => {
  if (connection) {
    return connection;
  }
  if (Boolean(process.env.IS_OFFLINE)) {
    connection = new AWS.DynamoDB.DocumentClient({
      ...config,
      region: 'localhost',
      endpoint: 'http://localhost:5000',
    });
  } else {
    connection = new AWS.DynamoDB.DocumentClient(config);
  }
  return connection;
};

export default getDynamoDBClient;
