import nookies from 'nookies';

import { GetServerSidePropsContext } from 'next';

import { auth, getUserData } from '@/lib/firebaseAdmin';

const getServerSideUserData = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const decodedToken = cookies.token
    ? await auth.verifyIdToken(cookies.token)
    : null;
  // @ts-ignore
  const { email = '', name = '', picture = '', uid = '' } = decodedToken ?? {};
  const user = decodedToken ? { email, name, picture, uid } : null;
  // retrieve user data from firestore
  const notionData = decodedToken ? await getUserData(uid) : null;
  return { user, notionData };
};

export default getServerSideUserData;
