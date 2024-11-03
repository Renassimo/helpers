import { GetServerSidePropsContextWithAuth } from '@/auth/types';

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
