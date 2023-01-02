import { remindersService } from '@services';
import debug from 'debug';

const logger = debug('app:error');
logger('KURVA ');
export const sendReminders = async () => {
  try {
    logger('HERE');
    await remindersService.sendEvents();
  } catch (e) {
    logger(e);
  }
};
