const formatResponse = <T>(response: T) => {
  return {
    statusCode: 400,
    body: JSON.stringify(response),
  };
};

const responseUtil = { formatResponse };

export default responseUtil;
