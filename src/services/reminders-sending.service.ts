import { reminderDtoCreators } from '@dto-creators';
import { ReminderTypeEnum } from '@enums';
import { remindersRepository } from '@repositories';
import { mailingService } from '@services';
import { timeUtil, envUtil } from '@utils';

import type { IReminderAttributes } from '@entities';

const env = envUtil.getEnv();

const reminderHandlers = {
  [ReminderTypeEnum.Email]: async (reminder: IReminderAttributes) => {
    mailingService.sendEmail(
      reminderDtoCreators.toEmailObject(env.recipient.recipientEmails, reminder),
    );
  },
  [ReminderTypeEnum.Phone]: (reminder: IReminderAttributes) => {
    //TODO: Add phone notification
    console.log('Not implemented yet');
    console.log(reminder);
  },
};

const sendEvents = async () => {
  let cursor = null;
  const limit = 100;
  const filterKey = timeUtil.getMinutelyTimeStamp(new Date());

  do {
    const reminders = await remindersRepository.getListByTime(filterKey, limit, cursor);
    for (const reminder of reminders.items) {
      try {
        await reminderHandlers[reminder.reminderType](reminder);
        await remindersRepository.deleteOneById(reminder.id);
      } catch (e) {
        //TODO add logger
        console.log(e);
      }
    }
    cursor = reminders.cursor ?? null;
  } while (cursor);
};

const remindersSendingService = { sendEvents };

export default remindersSendingService;
