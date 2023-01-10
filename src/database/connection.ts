import { envUtil } from '@utils';
import * as AWS from 'aws-sdk';
import dynamoose from 'dynamoose';

const env = envUtil.getEnv();

const { aws } = envUtil.getEnv();

AWS.config.update(aws);

const getDynamoDBClient = () => {
  let ddb;
  if (process.env.IS_OFFLINE) {
    ddb = new dynamoose.aws.ddb.DynamoDB({
      ...env.aws,
      ...env.awsDatabase,
    });
  } else {
    ddb = new dynamoose.aws.ddb.DynamoDB({
      ...env.aws,
    });
  }
  dynamoose.aws.ddb.set(ddb);

  return dynamoose;
};

export default getDynamoDBClient;
