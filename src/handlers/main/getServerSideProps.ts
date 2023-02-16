import { GetServerSidePropsContextWithAuth } from '@/types/auth';

const getServerSideProps = async (ctx: GetServerSidePropsContextWithAuth) => {
  const { user, notionData } = ctx;

  const pages = Object.entries(notionData ?? {}).map(([key, value]) => ({
    name: value?.name ?? key,
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
