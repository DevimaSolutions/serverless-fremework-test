import { remindersSendingService } from '@services';

export const sendReminders = async () => {
  try {
    await remindersSendingService.sendEvents();
  } catch (e) {
    //TODO: Remove console.log and add logger
    console.log(e);
  }
};
