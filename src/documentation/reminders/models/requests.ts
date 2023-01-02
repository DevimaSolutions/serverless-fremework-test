const baseReminderProperties = {
  title: {
    type: 'string',
  },
  sendDate: {
    type: 'string',
    format: 'date',
  },
};

export const createReminderRequestModel = {
  name: 'CreateReminderRequest',
  description: 'Json request for creating reminder',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: baseReminderProperties,
        required: ['title', 'sendDate'],
      },
    },
  },
};

export const updateReminderRequestModel = {
  name: 'UpdateReminderRequest',
  description: 'Json request for creating reminder',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: baseReminderProperties,
      },
    },
  },
};
