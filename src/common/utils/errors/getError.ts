import errors from './errors';

const getError = (status = 500, message = '') => {
  const error = errors[status] ?? errors[500];
  const customMessage = message
    ? `${error.message}: ${message}`
    : error.message;
  return { error: { ...error, message: customMessage } };
};

export default getError;
