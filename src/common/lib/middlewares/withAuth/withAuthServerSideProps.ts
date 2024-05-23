import { GetServerSidePropsContext } from 'next';
import sortBy from 'lodash/sortBy';

import getServerSideUserData from '@/common/utils/serverSideUserData';
import {
  redirectToSignIn,
  showNotFound,
} from '@/common/utils/serverSideRenderProps';

import { GetServerSidePropsContextWithAuth } from '@/types/auth';
import { NotionData } from '@/types/notion';
import { capitalCase } from 'change-case';

// todo use as separate module
const getPages = (notionData: NotionData) =>
  sortBy(
    Object.entries(notionData ?? {}).map(([key, value]) => ({
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
    const { user, notionData } = await getServerSideUserData(ctx);
    if (!user) return redirectToSignIn;

    const pages = getPages(notionData ?? {});

    if (helperName) {
      const helperData = notionData?.[helperName];
      const { dataBaseID = null, token = null } = helperData ?? {};

      if (!dataBaseID || !token) return showNotFound;
      return handler({ ...ctx, user, notionHelperData: helperData, pages });
    } else {
      if (!notionData) return showNotFound;
      return handler({ ...ctx, user, notionData, pages });
    }
  };
};

export default withAuthServerSideProps;
