const errors: Record<number, Record<string, string | number>> = {
  401: {
    code: 'not_authenticated',
    message: 'Not Authenticated',
    object: 'error',
    status: 405,
  },
  405: {
    code: 'method_not_allowed',
    message: 'Method Not Allowed',
    object: 'error',
    status: 405,
  },
  500: {
    code: 'internal_server_error',
    message: `Internal Server Error`,
    object: 'error',
    status: 500,
  },
};

export const getError = (status = 500, message = '') => {
  const error = errors[status] ?? errors[500];
  const customMessage = message
    ? `${error.message}: ${message}`
    : error.message;
  return { error: { ...error, message: customMessage } };
};
