import { remindersService } from '@services';
import debug from 'debug';

const logger = debug('app:error');

export const sendReminders = async () => {
  try {
    await remindersService.sendEvents();
  } catch (e) {
    logger(e);
  }
};
