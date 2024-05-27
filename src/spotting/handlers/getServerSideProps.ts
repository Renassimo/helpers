import { GetServerSidePropsContextWithAuth } from '@/auth/types';

import NotionService from '@/common/services/notion';

import { showNotFound } from '@/common/utils/serverSideRenderProps';

import getSpottedPlanes from '@/spotting/handlers/getSpottedPlanes';

const getServerSideProps = async (ctx: GetServerSidePropsContextWithAuth) => {
  const { user, notionHelperData, pages } = ctx;
  const { dataBaseID, token } = notionHelperData!;

  const notionService = new NotionService(token);

  const { data = null, error = null } = await getSpottedPlanes(
    notionService,
    dataBaseID
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
