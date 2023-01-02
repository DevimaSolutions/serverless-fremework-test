export const notFoundErrorModel = {
  name: 'NotFoundError',
  description: 'Page was not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          currentRoute: {
            type: 'string',
          },
          error: {
            type: 'string',
          },
          existingRoutes: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          statusCode: {
            type: 'integer',
          },
        },
      },
    },
  },
};

export const baseServerErrorModel = {
  name: 'BaseServerError',
  description: 'Base server error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'string',
          },
          payload: {
            type: 'object',
          },
        },
      },
    },
  },
};

export const validationErrorModel = {
  name: 'ValidationError',
  description: 'Base server error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
          statusCode: {
            type: 'string',
          },
          payload: {
            type: 'object',
            properties: {
              value: {
                type: 'object',
                properties: {
                  sendDate: {
                    type: 'string',
                    format: 'date',
                  },
                  title: {
                    type: 'string',
                  },
                },
              },
              path: {
                type: 'string',
              },
              type: {
                type: 'string',
              },
              errors: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              params: {
                type: 'object',
                properties: {
                  value: {
                    type: 'string',
                  },
                  originalValue: {
                    type: 'string',
                  },
                  path: {
                    type: 'string',
                  },
                },
              },
              inner: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              name: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};
