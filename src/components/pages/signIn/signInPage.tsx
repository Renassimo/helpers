import Head from 'next/head';

import useAuth from '@/hooks/useAuth';

import { User } from '@/types/auth';

const SignInPage = ({ user: serverSideUser }: { user: User }) => {
  const { signIn } = useAuth(serverSideUser);
  return (
    <>
      <Head>
        <title>Helpers - Sign In</title>
      </Head>
      <main>
        <button onClick={() => signIn('/')} type="button">
          sign in
        </button>
      </main>
    </>
  );
};

export default SignInPage;
