import nookies from 'nookies';

import { GetServerSidePropsContext } from 'next';

import { auth, getUserData } from '@/lib/firebaseAdmin';

const getServerSideUserData = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { token } = cookies;
  let decodedToken;

  if (token) {
    try {
      decodedToken = await auth.verifyIdToken(cookies.token);
    } catch (error) {
      decodedToken = null;
    }
  }

  // @ts-ignore
  const { email = '', name = '', picture = '', uid = '' } = decodedToken ?? {};
  const user = decodedToken ? { email, name, picture, uid } : null;
  // retrieve user data from firestore
  const { notionData = null } = decodedToken ? await getUserData(uid) : {};
  return { user, notionData };
};

export default getServerSideUserData;
