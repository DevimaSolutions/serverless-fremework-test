import { date, object, string } from 'yup';

export const reminderIdSchema = object()
  .shape({
    reminderId: string().uuid(),
  })
  .noUnknown();

export const createReminderSchema = object()
  .shape({
    title: string().required(),
    sendDate: date().required().min(new Date()),
  })
  .noUnknown();

export const updateReminderSchema = object()
  .shape({
    title: string(),
    sendDate: date().min(new Date()),
  })
  .noUnknown();
