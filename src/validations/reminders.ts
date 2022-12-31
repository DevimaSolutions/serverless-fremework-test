import { ReminderTypeEnum } from '@enums';
import { date, number, object, string } from 'yup';

import { paginationSchema } from './pagination';

export const reminderIdSchema = object()
  .shape({
    reminderId: string().uuid(),
  })
  .noUnknown();

export const createReminderSchema = object()
  .shape({
    title: string().required(),
    reminderType: number()
      .oneOf([ReminderTypeEnum.Email, ReminderTypeEnum.Phone])
      .default(ReminderTypeEnum.Email),
    sendDate: date().required(),
  })
  .noUnknown();

export const updateReminderSchema = object()
  .shape({
    title: string(),
    reminderType: number().oneOf([ReminderTypeEnum.Email, ReminderTypeEnum.Phone]),
    sendDate: date(),
  })
  .noUnknown();

export const reminderListSchema = paginationSchema
  .shape({
    reminderType: number()
      .oneOf([ReminderTypeEnum.Email, ReminderTypeEnum.Phone])
      .default(ReminderTypeEnum.Email),
  })
  .noUnknown();
