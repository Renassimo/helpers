import { showNotFound } from '@/utils/serverSideRenderProps';
import { getDayCode } from '@/utils/dayjs';

import NotionService from '@/services/notion';

import { getDay } from '@/handlers/fiveBook';

import { GetServerSidePropsContextWithAuth } from '@/types/auth';

const getServerSideProps = async (ctx: GetServerSidePropsContextWithAuth) => {
  const { user, notionHelperData } = ctx;
  const { dataBaseID, token } = notionHelperData!;

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

export default getServerSideProps;
