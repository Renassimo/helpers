import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import getServerSideUserData from '@/utils/serverSideUserData';

import useAuth from '@/hooks/useAuth';

import { User } from '@/types';

const Home = ({ user: serverSideUser }: { user: User }) => {
  const { user, signIn, signOut } = useAuth(serverSideUser);
  return (
    <>
      <Head>
        <title>Helpers - main</title>
      </Head>
      <main>
        {user ? (
          <button onClick={signOut} type="button">
            sign out
          </button>
        ) : (
          <button onClick={() => signIn()} type="button">
            sign in
          </button>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user, notionData } = await getServerSideUserData(ctx);
  console.log({ user, notionData });

  return {
    props: {
      user,
    },
  };
};

export default Home;
