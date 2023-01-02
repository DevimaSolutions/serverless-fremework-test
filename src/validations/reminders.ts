import { date, object, string } from 'yup';

export const reminderIdSchema = object()
  .shape({
    reminderId: string().uuid(),
  })
  .noUnknown();

export const createReminderSchema = object()
  .shape({
    title: string().required().max(1000),
    sendDate: date().required().min(new Date()),
  })
  .noUnknown();

export const updateReminderSchema = object()
  .shape({
    title: string(),
    sendDate: date().test('sendDate', 'Start date must be greater than now', function () {
      return new Date(this.parent.sendDate).getTime() > Date.now();
    }),
  })
  .noUnknown();
