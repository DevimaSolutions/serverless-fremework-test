import type { UpdatePayload } from 'database/types';

const getUpdatingMeta = <T extends object>(payload: T): UpdatePayload => {
  let updateExpression = 'set ';
  let expressionAttributeValues = {};
  for (const key in payload) {
    updateExpression = `${updateExpression} ${key} = :${key},`;
    expressionAttributeValues = { ...expressionAttributeValues, [`:${key}`]: payload[key] };
  }
  return {
    UpdateExpression: updateExpression.substring(0, updateExpression.lastIndexOf(',')),
    ExpressionAttributeValues: expressionAttributeValues,
  };
};

const createCursor = (lastEvaluatedKey) =>
  Buffer.from(JSON.stringify(lastEvaluatedKey)).toString('base64');

const parseCursor = (cursor: string) => JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));

const databaseUtil = {
  getUpdatingMeta,
  createCursor,
  parseCursor,
};

export default databaseUtil;
