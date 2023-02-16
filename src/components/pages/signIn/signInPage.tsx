import Head from 'next/head';

import useAuth from '@/hooks/useAuth';

import { User } from '@/types/auth';

import Button from '@mui/material/Button';

const SignInPage = ({ user: serverSideUser }: { user: User }) => {
  const { signIn } = useAuth(serverSideUser);
  return (
    <>
      <Head>
        <title>Helpers - Sign In</title>
      </Head>
      <main>
        <Button onClick={() => signIn('/')} type="button">
          sign in
        </Button>
        <p>Helpers - Sign in</p>
      </main>
    </>
  );
};

export default SignInPage;
