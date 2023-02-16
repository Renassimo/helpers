import auth from '@/lib/firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/types/auth';
import { getError } from '@/utils/errors';
import getUserNotionData from '@/utils/userNotinData';

const withAuthApi = (
  handler: (req: NextApiRequest, res: NextApiResponse) => void,
  helperName?: string
) => {
  return async (req: NextApiRequestWithAuth, res: NextApiResponse) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json(getError(401, 'No token'));

    try {
      const decodedToken = await auth.verifyIdToken(token);
      const { uid } = decodedToken ?? {};
      if (!decodedToken || !decodedToken.uid)
        return res.status(401).json(getError(401));
      req.uid = uid;

      const { notionData } = await getUserNotionData(`${uid}`);
      if (!notionData)
        return res.status(403).json(getError(403, 'No Notion data'));

      if (helperName) {
        const helperData = notionData[helperName];
        if (!helperData)
          return res.status(403).json(getError(403, 'No Notion helper data'));

        const { token: notionToken } = helperData;
        if (!notionToken)
          return res.status(403).json(getError(403, 'No Notion token'));

        req.notionHelperData = helperData;
      } else {
        req.notionData = notionData;
      }
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.errorInfo?.code;

      error.status = 401;
      if (errorCode === 'auth/internal-error') error.status = 500;

      return res.status(error.status).json(getError(error.status, errorCode));
    }

    return handler(req, res);
  };
};

export default withAuthApi;
