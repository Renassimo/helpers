import { GetServerSidePropsContext } from 'next';
import sortBy from 'lodash/sortBy';

import getServerSideUserData from '@/common/utils/serverSideUserData';
import {
  redirectToSignIn,
  showNotFound,
} from '@/common/utils/serverSideRenderProps';

import { GetServerSidePropsContextWithAuth } from '@/common/types/auth';
import { HelpersData } from '@/common/types/helpers';
import { capitalCase } from 'change-case';

// todo use as separate module
const getPages = (helpersData: HelpersData) =>
  sortBy(
    Object.entries(helpersData ?? {}).map(([key, value]) => ({
      title: value?.title ?? capitalCase(key),
      path: value?.path ?? `/${key}`,
    })),
    'title'
  );

const withAuthServerSideProps = (
  handler: (ctx: GetServerSidePropsContextWithAuth) => object,
  helperName?: string
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { user, helpersData } = await getServerSideUserData(ctx);
    if (!user) return redirectToSignIn;

    const pages = getPages(helpersData ?? {});

    if (helperName) {
      const helperData = helpersData?.[helperName];
      const { notionData } = helperData ?? {};
      const { dataBaseID = null, token = null } = notionData ?? {};

      if (!dataBaseID || !token) return showNotFound;
      return handler({ ...ctx, user, notionHelperData: notionData, pages });
    } else {
      if (!helpersData) return showNotFound;
      return handler({ ...ctx, user, helpersData, pages });
    }
  };
};

export default withAuthServerSideProps;
