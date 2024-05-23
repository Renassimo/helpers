import { showNotFound } from '@/common/utils/serverSideRenderProps';
import { getDayCode } from '@/common/utils/dayjs';

import NotionService from '@/common/services/notion';

import { getDay } from '@/fiveBook/handlers';

import { GetServerSidePropsContextWithAuth } from '@/common/types/auth';

const getServerSideProps = async (ctx: GetServerSidePropsContextWithAuth) => {
  const { user, notionHelperData, pages } = ctx;
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
      pages,
      data,
      error,
    },
  };
};

export default getServerSideProps;
