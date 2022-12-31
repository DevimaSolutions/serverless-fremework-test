import { databaseConstants } from '@constants';

export const reminderModel = {
  RemindersTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: databaseConstants.databaseTablesName.reminders,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'sendDate',
          AttributeType: 'N',
        },
        {
          AttributeName: 'createdAt',
          AttributeType: 'N',
        },
        {
          AttributeName: 'reminderType',
          AttributeType: 'N',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: databaseConstants.databaseIndexName.timeIndex,
          KeySchema: [
            {
              AttributeName: 'sendDate',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
        {
          IndexName: databaseConstants.databaseIndexName.sortIndex,
          KeySchema: [
            {
              AttributeName: 'reminderType',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'createdAt',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
    },
  },
};
