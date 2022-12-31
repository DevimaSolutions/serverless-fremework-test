import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';

import errorHandler from './error-handler';
import responseHandler from './response-handler';

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(responseHandler).use(errorHandler);
};
