import { remindersService } from '@services';
import debug from 'debug';

export const sendReminders = async () => {
  try {
    await remindersService.sendEvents();
  } catch (e) {
    debug(e);
  }
};
