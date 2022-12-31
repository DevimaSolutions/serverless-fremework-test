import { handlerPath } from '@utils';

export default {
  handler: `${handlerPath(__dirname)}/handler.sendReminders`,
  events: [
    {
      schedule: 'rate(1 minute)',
    },
  ],
};
