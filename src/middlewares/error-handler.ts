import { errorMessages } from '@constants';
import ClientError from 'models/client-error';
import { ValidationError } from 'yup';

const errorHandler = {
  onError: (handler) => {
    if (handler.error instanceof ClientError) {
      return {
        statusCode: handler.error.statusCode,
        body: JSON.stringify({
          error: handler.error.message,
          statusCode: handler.error.statusCode,
          payload: handler.error.payload,
        }),
      };
    }
    if (handler.error instanceof ValidationError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: handler.error.message,
          statusCode: 400,
          payload: handler.error,
        }),
      };
    }
    //TODO: Add logger
    console.log(handler.error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: errorMessages.internalError, statusCode: 500, payload: {} }),
    };
  },
};

export default errorHandler;
