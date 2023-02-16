import { capitalCase } from 'change-case';
import { GetServerSidePropsContextWithAuth } from '@/types/auth';

const getServerSideProps = async (ctx: GetServerSidePropsContextWithAuth) => {
  const { user, notionData } = ctx;

  const pages = Object.entries(notionData ?? {}).map(([key, value]) => ({
    title: value?.name ?? capitalCase(key),
    url: value?.path ?? `/${key}`,
  }));

  return {
    props: {
      user,
      pages,
    },
  };
};

export default getServerSideProps;
