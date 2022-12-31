import type { IBaseAttributes } from './base.entity';
import type { ReminderTypeEnum } from '@enums';

export interface IReminderAttributes extends IBaseAttributes {
  title: string;
  reminderType: ReminderTypeEnum;
  sendDate: number;
}
