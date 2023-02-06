import { auth } from '@/lib/firebaseAdmin';
import { NextApiRequest, NextApiResponse } from 'next';
import { Data } from '@/types';

export function withAuth(
  handler: (req: NextApiRequest, res: NextApiResponse<Data>) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ code: '401', detail: 'Not authenticated. No token' });

    try {
      const decodedToken = await auth.verifyIdToken(token);
      if (!decodedToken || !decodedToken.uid)
        return res
          .status(401)
          .json({ code: '401', detail: 'Not authenticated' });
      // todo remove line bellow after api check
      // req.uid = decodedToken.uid
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.errorInfo?.code;

      error.status = 401;
      if (errorCode === 'auth/internal-error') error.status = 500;

      return res
        .status(error.status)
        .json({ code: `${error.status}`, detail: errorCode });
    }

    return handler(req, res);
  };
}
