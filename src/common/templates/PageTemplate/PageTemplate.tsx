import Head from 'next/head';
import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Container from '@mui/material/Container';

import NavBar from '@/common/components/NavBar';
import PageWrapper from '@/common/components/PageWrapper';
import StaticNavBar from '@/common/components/StaticNavBar';

import { PageInfo, User } from '@/auth/types';

const NavBarWrapper = styled.div(
  ({ theme }) => css`
    grid-row: 1;

    ${theme.breakpoints.down('md')} {
      grid-row: 2;
    }
  `
);

const ContainerWrapper = styled.div(
  ({ theme }) => css`
    grid-row: 2;
    display: grid;
    grid-template-rows: 1fr;

    ${theme.breakpoints.down('md')} {
      grid-row: 1;
      overflow: auto;
    }
  `
);

const PageTemplate = ({
  title,
  user,
  pages = [],
  children,
  navBarChildren,
}: {
  title: string;
  user?: User | null;
  pages?: PageInfo[];
  children: ReactNode;
  navBarChildren?: ReactNode;
}) => {
  const titleText = `Helpers - ${title}`;
  return (
    <>
      <Head>
        <title>{titleText}</title>
      </Head>
      <PageWrapper>
        <NavBarWrapper>
          {user ? (
            <NavBar serverSideUser={user} pages={pages}>
              {navBarChildren}
            </NavBar>
          ) : (
            <StaticNavBar pages={pages}>{navBarChildren}</StaticNavBar>
          )}
        </NavBarWrapper>
        <ContainerWrapper>
          <Container fixed sx={{ display: 'flex', flexDirection: 'column' }}>
            {children}
          </Container>
        </ContainerWrapper>
      </PageWrapper>
    </>
  );
};

export default PageTemplate;
