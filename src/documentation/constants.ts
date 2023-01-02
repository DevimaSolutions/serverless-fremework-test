import { limitParam, cursorParam } from './params';

export const defaultErrorResponses = [
  {
    statusCode: 404,
    responseBody: {
      description: 'Page not found',
    },
    responseModels: {
      'application/json': 'NotFoundError',
    },
  },
  {
    statusCode: 400,
    responseBody: {
      description: 'Base server error',
    },
    responseModels: {
      'application/json': 'BaseServerError',
    },
  },
  {
    statusCode: 500,
    responseBody: {
      description: 'Internal server error',
    },
    responseModels: {
      'application/json': 'BaseServerError',
    },
  },
];

export const defaultPaginationParams = [limitParam, cursorParam];
