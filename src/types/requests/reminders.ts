import type { ReminderTypeEnum } from '@enums';

export interface ICreateReminderRequest {
  title: string;
  reminderType: ReminderTypeEnum;
  sendDate: Date;
}

export interface IUpdateReminderRequest {
  title?: string;
  reminderType?: ReminderTypeEnum;
  sendDate?: Date;
}
