import { GetServerSidePropsContextWithAuth } from '@/types/auth';

import NotionService from '@/services/notion';

import { showNotFound } from '@/utils/serverSideRenderProps';

import getSpottedPlanes from '@/handlers/spotting/getSpottedPlanes';

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
