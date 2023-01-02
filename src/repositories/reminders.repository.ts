import { databaseConstants } from '@constants';
import getDynamoDBClient from '@database';
import { databaseUtil } from '@utils';

import type { IReminderAttributes } from '@entities';
import type { ReminderTypeEnum } from '@enums';
import type { ICursor } from 'database/types';

const connection = getDynamoDBClient();

const table = databaseConstants.databaseTablesName.reminders;

const create = async (payload: IReminderAttributes) =>
  connection
    .put({
      TableName: table,
      Item: payload,
    })
    .promise();

const update = async (reminderId: string, payload: Partial<IReminderAttributes>) =>
  connection
    .update({
      TableName: table,
      Key: { id: reminderId },
      ...databaseUtil.getUpdatingMeta(payload),
      ReturnValues: databaseConstants.databaseReturningType.allNew,
    })
    .promise();

const getOne = async (reminderId: string) =>
  connection
    .get({
      TableName: table,
      Key: { id: reminderId },
    })
    .promise();

const getList = async (
  type: ReminderTypeEnum,
  limit = 100,
  cursor?: ICursor | null,
): Promise<{ items: IReminderAttributes[]; cursor: ICursor }> => {
  const params = {
    TableName: table,
    Limit: limit,
    IndexName: databaseConstants.databaseIndexName.sortIndex,
    KeyConditionExpression: 'reminderType = :reminderType',
    ScanIndexForward: true,
    ExpressionAttributeValues: {
      ':reminderType': type,
    },
    ...(cursor ? { ExclusiveStartKey: cursor } : {}),
  };

  const result = await connection.query(params).promise();

  return {
    items: result.Items as IReminderAttributes[],
    cursor: result.LastEvaluatedKey,
  };
};

const getListByTime = async (
  sendKey: number,
  limit = 100,
  cursor?: ICursor | null,
): Promise<{ items: IReminderAttributes[]; cursor: ICursor }> => {
  const queryParams = {
    TableName: table,
    IndexName: databaseConstants.databaseIndexName.timeIndex,
    KeyConditionExpression: 'sendDate = :sendDate',
    ExpressionAttributeValues: {
      ':sendDate': sendKey,
    },
    Limit: limit,
    ...(cursor ? { ExclusiveStartKey: cursor } : {}),
  };

  const result = await connection.query(queryParams).promise();

  return {
    items: result.Items as IReminderAttributes[],
    cursor: result.LastEvaluatedKey,
  };
};

const deleteOneById = async (reminderId: string) =>
  connection
    .delete({
      TableName: table,
      Key: { id: reminderId },
    })
    .promise();

const remindersRepository = { create, update, getOne, deleteOneById, getList, getListByTime };

export default remindersRepository;
