import {
  createReminderDocumentation,
  getReminderDocumentation,
  deleteReminderDocumentation,
  updateReminderDocumentation,
  getRemindersListDocumentation,
} from '@docs';
import { handlerPath } from '@utils';

export const createReminder = {
  handler: `${handlerPath(__dirname)}/handler.createReminder`,
  events: [
    {
      http: {
        method: 'post',
        path: 'reminders',
        documentation: createReminderDocumentation,
      },
    },
  ],
};

export const updateReminder = {
  handler: `${handlerPath(__dirname)}/handler.updateReminder`,
  events: [
    {
      http: {
        method: 'put',
        path: 'reminders/{reminderId}',
        documentation: updateReminderDocumentation,
      },
    },
  ],
};

export const deleteReminder = {
  handler: `${handlerPath(__dirname)}/handler.deleteReminder`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'reminders/{reminderId}',
        documentation: deleteReminderDocumentation,
      },
    },
  ],
};

export const getRemindersList = {
  handler: `${handlerPath(__dirname)}/handler.getRemindersList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'reminders',
        documentation: getRemindersListDocumentation,
      },
    },
  ],
};

export const getReminderById = {
  handler: `${handlerPath(__dirname)}/handler.getReminderById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'reminders/{reminderId}',
        documentation: getReminderDocumentation,
      },
    },
  ],
};
