import { GetServerSidePropsContext } from 'next';

import getServerSideUserData from '@/utils/serverSideUserData';
import { redirectToSignIn, showNotFound } from '@/utils/serverSideRenderProps';

import { GetServerSidePropsContextWithAuth } from '@/types/auth';

const withAuthServerSideProps = (
  handler: (ctx: GetServerSidePropsContextWithAuth) => object,
  helperName?: string
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { user, notionData } = await getServerSideUserData(ctx);
    if (!user) return redirectToSignIn;

    if (helperName) {
      const helperData = notionData?.[helperName];
      const { dataBaseID = null, token = null } = helperData ?? {};

      if (!dataBaseID || !token) return showNotFound;
      return handler({ ...ctx, user, notionHelperData: helperData });
    } else {
      if (!notionData) return showNotFound;
      return handler({ ...ctx, user, notionData });
    }
  };
};

export default withAuthServerSideProps;
