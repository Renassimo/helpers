import nookies from 'nookies';

import { GetServerSidePropsContext } from 'next';

import auth from '@/common/lib/firebase/auth';

import getUserNotionData from '@/utils/userNotinData';

const getServerSideUserData = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { token } = cookies;

  if (!token) return { user: null, notionData: null };

  try {
    const {
      email = '',
      name = '',
      picture = '',
      uid = '',
    } = (await auth.verifyIdToken(cookies.token)) ?? {
      name: '',
    };
    const { notionData } = await getUserNotionData(uid);

    return { user: { email, name, picture, uid }, notionData };
  } catch (error) {
    return { user: null, notionData: null };
  }
};

export default getServerSideUserData;
