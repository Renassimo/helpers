import auth from '@/common/lib/firebase/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { getError } from '@/common/utils/errors';
import getUserHelpersData from '@/common/utils/userHelpersData';

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

      const { helpersData } = await getUserHelpersData(`${uid}`);
      if (!helpersData)
        return res.status(403).json(getError(403, 'No Helpers data'));

      if (helperName) {
        const helperData = helpersData[helperName];
        if (!helperData)
          return res.status(403).json(getError(403, 'No Helper data'));

        const { notionData } = helperData;
        const { token: notionToken } = helperData.notionData ?? {};
        if (!notionToken)
          return res.status(403).json(getError(403, 'No Notion token'));

        req.notionHelperData = notionData;
      } else {
        req.helpersData = helpersData;
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
