import { timeUtil } from '@utils';
import { v4 } from 'uuid';

import type { IMail } from '@dto';
import type { IReminderAttributes } from '@entities';
import type { ICreateReminderRequest } from '@requests';
import type { IReminderResponse } from '@responses';

export const createReminderResponse = (reminder: IReminderAttributes): IReminderResponse => ({
  id: reminder.id,
  title: reminder.title,
  sendDate: new Date(reminder.sendDate),
  createdAt: new Date(reminder.createdAt),
  updatedAt: new Date(reminder.updatedAt),
});

export const createRemindersResponse = (reminders: IReminderAttributes[]): IReminderResponse[] =>
  reminders.map(createReminderResponse);

export const toDbObject = (reminder: ICreateReminderRequest): IReminderAttributes => ({
  id: v4(),
  ...reminder,
  sendDate: timeUtil.getMinutelyTimeStamp(reminder.sendDate),
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const toDbUpdateObject = (
  reminder: Partial<ICreateReminderRequest>,
): Partial<IReminderAttributes> =>
  ({
    ...reminder,
    ...(reminder.sendDate ? { sendDate: reminder.sendDate.getTime() } : {}),
    updatedAt: new Date(),
  } as Partial<IReminderAttributes>);

export const toEmailObject = (recipients: string[], reminder: IReminderAttributes): IMail => ({
  recipients: recipients,
  title: reminder.title,
});
