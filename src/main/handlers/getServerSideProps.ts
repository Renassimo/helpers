import { GetServerSidePropsContextWithAuth } from '@/types/auth';

const getServerSideProps = async (ctx: GetServerSidePropsContextWithAuth) => {
  const { user, pages } = ctx;
  return {
    props: {
      user,
      pages,
    },
  };
};

export default getServerSideProps;
