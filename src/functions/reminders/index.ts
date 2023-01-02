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
  timeout: 400,
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
  timeout: 400,
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
  timeout: 400,
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
  timeout: 400,
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
  timeout: 400,
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
