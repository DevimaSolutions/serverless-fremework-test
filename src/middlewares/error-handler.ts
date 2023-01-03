import { errorMessages } from '@constants';
import { ClientError } from '@errors';
import debug from 'debug';
import { ValidationError } from 'yup';

import type { IErrorResponseBody } from '@responses';

const logger = debug('app:error');

const errorHandler = {
  onError: (handler) => {
    const { error } = handler;

    let responseBody: IErrorResponseBody = {
      error: errorMessages.internalError,
      statusCode: 500,
      payload: {},
    };

    if (error instanceof ClientError) {
      responseBody = {
        error: error.message,
        statusCode: error.statusCode,
        payload: error.payload,
      };
    }
    if (error instanceof ValidationError) {
      responseBody = {
        error: error.message,
        statusCode: 400,
        payload: error,
      };
    }

    // This is internal server error
    if (responseBody.statusCode == 500) {
      console.debug(handler.error);
      logger(JSON.stringify(error));
    }

    return {
      statusCode: responseBody.statusCode,
      body: JSON.stringify(responseBody),
    };
  },
};

export default errorHandler;
