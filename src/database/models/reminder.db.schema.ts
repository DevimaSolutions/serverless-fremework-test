import { databaseConstants } from '@constants';

import connection from '../connection';

import { baseDbIdSchema, baseDbTimestampsSchema } from './base.db.schema';

import type { IReminderAttributes } from '@entities';

const dynamoose = connection();

const reminderSchema = new dynamoose.Schema(
  {
    ...baseDbIdSchema,
    title: {
      type: String,
      required: true,
    },
    reminderType: {
      type: Number,
      required: true,
      index: {
        type: 'global',
        name: databaseConstants.databaseIndexName.sortIndex,
        rangeKey: 'createdAt',
        throughput: { read: 5, write: 10 },
      },
    },
    sendDate: {
      type: Number,
      required: true,
      index: {
        type: 'global',
        name: databaseConstants.databaseIndexName.timeIndex,
      },
    },
  },
  baseDbTimestampsSchema,
);

const Reminder = dynamoose.model<IReminderAttributes>(
  databaseConstants.databaseTablesName.reminders,
  reminderSchema,
);
export default Reminder;
