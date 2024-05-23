import { GetServerSidePropsContext } from 'next';

import getServerSideUserData from '@/common/utils/serverSideUserData';
import { redirectToMain } from '@/common/utils/serverSideRenderProps';

const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await getServerSideUserData(ctx);
  if (user) return redirectToMain;

  return {
    props: {},
  };
};

export default getServerSideProps;
