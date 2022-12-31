const responseHandler = {
  after: (handler) => {
    return {
      statusCode: 200,
      body: JSON.stringify(handler.response),
    };
  },
};

export default responseHandler;
