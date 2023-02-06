import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import { FiveBookData } from '@/types/fiveBook';
import { NotionError } from '@/types/notion';

import getServerSideUserData from '@/utils/serverSideUserData';
import { redirectToSignIn, showNotFound } from '@/utils/serverSideRender';

import NotionService from '@/services/notion';

import { getDay } from '@/handlers/fiveBook/get';
import { getDayCode } from '@/utils/dayjs';

const FiveBook = ({
  data,
  error,
}: {
  data: FiveBookData;
  error: NotionError;
}) => {
  console.log({ data, error });

  return (
    <>
      <Head>
        <title>5book - helpers</title>
      </Head>
      <main>{data?.attributes?.question?.value}</main>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user, notionData } = await getServerSideUserData(ctx);
  if (!user) return redirectToSignIn;

  const { fiveBook = null } = notionData ?? {};
  const { dataBaseID = null, token = null } = fiveBook ?? {};
  if (!dataBaseID && !token) return showNotFound;

  const notionService = new NotionService(token);
  const { dayCode = getDayCode() } = ctx.query;
  const { data, error } = await getDay(notionService, dataBaseID, `${dayCode}`);
  if (error?.status === 404) return showNotFound;

  return {
    props: {
      user,
      data,
      error,
    },
  };
};

export default FiveBook;
