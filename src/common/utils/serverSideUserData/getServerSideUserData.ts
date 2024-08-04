import nookies from 'nookies';

import { GetServerSidePropsContext } from 'next';

import auth from '@/common/lib/firebase/auth';

import getUserHelpersData from '@/common/utils/userHelpersData';

import { ServerSideUserData } from '@/auth/types';
import { Firestore } from '@/common/lib/firebase/types';

const getServerSideUserData = async (
  ctx: GetServerSidePropsContext,
  db: Firestore
): Promise<ServerSideUserData> => {
  const cookies = nookies.get(ctx);
  const { token } = cookies;

  if (!token) return { user: null, helpersData: null };

  try {
    const {
      email = '',
      name = '',
      picture = '',
      uid = '',
    } = (await auth.verifyIdToken(cookies.token)) ?? {
      name: '',
    };
    const { helpersData } = await getUserHelpersData(uid, db);

    return { user: { email, name, picture, uid }, helpersData };
  } catch (error) {
    return { user: null, helpersData: null };
  }
};

export default getServerSideUserData;
