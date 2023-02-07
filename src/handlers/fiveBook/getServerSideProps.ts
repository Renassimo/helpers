import { GetServerSidePropsContext } from 'next';

import getServerSideUserData from '@/utils/serverSideUserData';
import { redirectToSignIn, showNotFound } from '@/utils/serverSideRender';
import { getDayCode } from '@/utils/dayjs';

import NotionService from '@/services/notion';

import getDay from '@/handlers/fiveBook/get';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user, notionData } = await getServerSideUserData(ctx);
  if (!user) return redirectToSignIn;

  const { fiveBook = null } = notionData ?? {};
  const { dataBaseID = null, token = null } = fiveBook ?? {};
  if (!dataBaseID || !token) return showNotFound;

  const notionService = new NotionService(token);
  const { dayCode = getDayCode() } = ctx.query;
  const { data = null, error = null } = await getDay(
    notionService,
    dataBaseID,
    `${dayCode}`
  );
  if (error?.status === 404) return showNotFound;

  return {
    props: {
      user,
      data,
      error,
    },
  };
};
