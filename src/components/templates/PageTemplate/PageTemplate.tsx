import Head from 'next/head';
import { ReactNode } from 'react';

import Container from '@mui/material/Container';

import NavBar from '@/components/common/NavBar';
import PageWrapper from '@/components/common/PageWrapper';

import { PageInfo, User } from '@/types/auth';

const PageTemplate = ({
  title,
  user,
  pages,
  children,
}: {
  title: string;
  user: User;
  pages: PageInfo[];
  children: ReactNode;
}) => {
  return (
    <>
      <Head>
        <title>Helpers - {title}</title>
      </Head>
      <PageWrapper>
        <NavBar serverSideUser={user} pages={pages} />
        <Container fixed>{children}</Container>
      </PageWrapper>
    </>
  );
};

export default PageTemplate;
