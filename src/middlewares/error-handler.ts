import { errorMessages } from '@constants';
import ClientError from 'models/client-error';
import { ValidationError } from 'yup';

const errorHandler = {
  onError: (handler) => {
    if (handler.error instanceof ClientError) {
      return {
        statusCode: handler.error.statusCode,
        body: JSON.stringify(handler.error.body),
      };
    }
    if (handler.error instanceof ValidationError) {
      return {
        statusCode: 400,
        body: JSON.stringify(handler.error),
      };
    }
    //TODO: Add logger
    console.log(handler.error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: errorMessages.internalError }),
    };
  },
};

export default errorHandler;
