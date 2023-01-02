import { defaultErrorResponses, defaultPaginationParams } from '../constants';

import { reminderIdParam } from './params';

export const createReminderDocumentation = {
  summary: 'Create Reminder',
  description: 'Creates a reminder to send',
  requestBody: {
    description: 'Creating reminder params object',
  },
  requestModels: {
    'application/json': 'CreateReminderRequest',
  },
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'A created reminder object',
      },
      responseModels: {
        'application/json': 'ReminderResponse',
      },
    },
    {
      statusCode: 400,
      responseBody: {
        description: 'Validation error',
      },
      responseModels: {
        'application/json': 'ValidationError',
      },
    },
    ...defaultErrorResponses,
  ],
};

export const updateReminderDocumentation = {
  summary: 'Update reminder',
  description: 'Updates a reminder to send',
  pathParams: [reminderIdParam],
  requestBody: {
    description: 'A update reminder params object',
  },
  requestModels: {
    'application/json': 'UpdateReminderRequest',
  },
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'A updated reminder object',
      },
      responseModels: {
        'application/json': 'ReminderResponse',
      },
    },
    {
      statusCode: 400,
      responseBody: {
        description: 'Validation error',
      },
      responseModels: {
        'application/json': 'ValidationError',
      },
    },
    {
      statusCode: 404,
      responseBody: {
        description: 'Entity was not found',
      },
      responseModels: {
        'application/json': 'BaseServerError',
      },
    },
    ...defaultErrorResponses,
  ],
};

export const deleteReminderDocumentation = {
  summary: 'Delete reminder',
  description: 'Delete a reminder to send',
  pathParams: [reminderIdParam],
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'Success message',
      },
      responseModels: {
        'application/json': 'BaseSuccess',
      },
    },
    {
      statusCode: 404,
      responseBody: {
        description: 'Entity was not found',
      },
      responseModels: {
        'application/json': 'BaseServerError',
      },
    },
    ...defaultErrorResponses,
  ],
};

export const getRemindersListDocumentation = {
  summary: 'Get reminders list',
  description: 'Get reminders list',
  queryParams: defaultPaginationParams,

  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'List of paginated reminders',
      },
      responseModels: {
        'application/json': 'RemindersListResponse',
      },
    },
    ...defaultErrorResponses,
  ],
};
export const getReminderDocumentation = {
  summary: 'Get reminder by id',
  description: 'Get reminder by id',
  pathParams: [reminderIdParam],
  methodResponses: [
    {
      statusCode: 200,
      responseBody: {
        description: 'Reminder object',
      },
      responseModels: {
        'application/json': 'ReminderResponse',
      },
    },
    {
      statusCode: 404,
      responseBody: {
        description: 'Entity was not found',
      },
      responseModels: {
        'application/json': 'BaseServerError',
      },
    },
    ...defaultErrorResponses,
  ],
};
