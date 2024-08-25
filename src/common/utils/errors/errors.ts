const errors: Record<number, Record<string, string | number>> = {
  400: {
    code: 'bad_request',
    message: 'Bad Request',
    object: 'error',
    status: 400,
  },
  401: {
    code: 'not_authenticated',
    message: 'Not Authenticated',
    object: 'error',
    status: 401,
  },
  403: {
    code: 'forbidden',
    message: 'Forbidden',
    object: 'error',
    status: 403,
  },
  404: {
    code: 'not_found',
    message: 'Not Found',
    object: 'error',
    status: 404,
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

export default errors;
