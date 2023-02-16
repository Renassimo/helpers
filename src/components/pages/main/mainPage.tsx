import Head from 'next/head';

import useAuth from '@/hooks/useAuth';

import { PageInfo, User } from '@/types/auth';

const MainPage = ({
  user: serverSideUser,
  pages,
}: {
  user: User;
  pages: PageInfo;
}) => {
  const { user, signOut } = useAuth(serverSideUser);
  console.log({ pages });

  return (
    <>
      <Head>
        <title>Helpers - main</title>
      </Head>
      <main>
        {user && (
          <button onClick={signOut} type="button">
            sign out
          </button>
        )}
      </main>
    </>
  );
};

export default MainPage;
