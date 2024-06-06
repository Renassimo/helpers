import { GetServerSidePropsContext } from 'next';
import { getFirestore } from 'firebase-admin/firestore';

import getServerSideUserData from '@/common/utils/serverSideUserData';
import { redirectToMain } from '@/common/utils/serverSideRenderProps';

const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await getServerSideUserData(ctx, getFirestore());
  if (user) return redirectToMain;

  return {
    props: {},
  };
};

export default getServerSideProps;
