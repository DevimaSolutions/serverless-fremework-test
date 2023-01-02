const baseReminderProperties = {
  id: {
    type: 'string',
  },
  title: {
    type: 'string',
  },
  sendDate: {
    type: 'string',
    format: 'date',
  },
  createdAt: {
    type: 'string',
    format: 'date',
  },
  updatedAt: {
    type: 'string',
    format: 'date',
  },
};

export const reminderResponseModel = {
  name: 'ReminderResponse',
  description: 'Base reminder response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: baseReminderProperties,
      },
    },
  },
};

export const remindersListResponseModel = {
  name: 'RemindersListResponse',
  description: 'Base reminder list',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                title: {
                  type: 'string',
                },
                sendDate: {
                  type: 'string',
                  format: 'date',
                },
                createdAt: {
                  type: 'string',
                  format: 'date',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date',
                },
              },
            },
          },
          cursor: {
            type: 'string',
          },
        },
      },
    },
  },
};
