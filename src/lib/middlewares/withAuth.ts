import auth from '@/lib/firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/types';
import { getError } from '@/utils/errors';

export function withAuth(
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json(getError(401, 'No token'));

    try {
      const decodedToken = await auth.verifyIdToken(token);
      if (!decodedToken || !decodedToken.uid)
        return res.status(401).json(getError(401));
      req.uid = decodedToken.uid;
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.errorInfo?.code;

      error.status = 401;
      if (errorCode === 'auth/internal-error') error.status = 500;

      return res.status(error.status).json(getError(error.status, errorCode));
    }

    return handler(req, res);
  };
}
