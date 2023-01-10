import type { IBaseAttributes } from './base.entity';
import type { ReminderTypeEnum } from '@enums';
import type { AnyItem } from 'dynamoose/dist/Item';

export interface IReminderAttributes extends IBaseAttributes {
  title: string;
  reminderType: ReminderTypeEnum;
  sendDate: number;
}

export type IReminder = IReminderAttributes & AnyItem & {};
