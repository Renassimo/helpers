import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { FiveBookData } from '@/types/fiveBook';
import { NotionError } from '@/types/notion';
import { PageInfo, User } from '@/types/auth';

import FiveBookProvider from '@/providers/fiveBook/FiveBookProvider';

import PageTemplate from '@/common/templates/PageTemplate';
import CreateAnswerCard from '@/fiveBook/components/CreateAnswerCard';
import AnswersCard from '@/fiveBook/components/AnswersCard';
import DayLink from '@/fiveBook/components/DayLink';
import DatePicker from '@/fiveBook/components/DatePicker';

import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useAlerts from '@/common/hooks/alerts';
import { useEffect } from 'react';

const Wrapper = styled.div(
  ({ theme }) => css`
    padding: ${theme.spacing(4)} 0;
    display: grid;
    grid-gap: ${theme.spacing(2)};
    grid-template-columns: auto 1fr 1fr auto;
    grid-template-rows: 1fr;

    ${theme.breakpoints.down('md')} {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
  `
);

const DayLinkWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    ${theme.breakpoints.down('md')} {
      display: none;
    }
  `
);

const CreateAnswerCardWrapper = styled.div(
  ({ theme }) => css`
    ${theme.breakpoints.down('md')} {
      grid-row: 2;
    }
  `
);

const AnswerCardWrapper = styled.div(
  ({ theme }) => css`
    ${theme.breakpoints.down('md')} {
      grid-row: 1;
    }
  `
);

const FiveBookPage = ({
  user,
  pages,
  data,
  error,
}: {
  user: User;
  pages: PageInfo[];
  data: FiveBookData | null;
  error: NotionError | null;
}) => {
  const theme = useTheme();
  const isLowerThanMd = useMediaQuery(theme.breakpoints.down('md'));
  const { createErrorAlert } = useAlerts();

  useEffect(() => {
    if (error) createErrorAlert(error.message || error.code || error.status);
  }, [createErrorAlert, error]);

  return (
    <FiveBookProvider data={data}>
      <PageTemplate
        title="5book"
        user={user}
        pages={pages}
        navBarChildren={
          isLowerThanMd && (
            <Box display="grid" gap={1} gridTemplateColumns="1fr 1fr 1fr">
              <DayLink prev />
              <DatePicker />
              <DayLink next />
            </Box>
          )
        }
      >
        {data && (
          <Wrapper>
            <DayLinkWrapper>
              <DayLink prev />
            </DayLinkWrapper>
            <CreateAnswerCardWrapper>
              <CreateAnswerCard />
            </CreateAnswerCardWrapper>
            <AnswerCardWrapper>
              <AnswersCard />
            </AnswerCardWrapper>
            <DayLinkWrapper>
              <DayLink next />
            </DayLinkWrapper>
          </Wrapper>
        )}
        {error && <h3>Error: {error.message}</h3>}
      </PageTemplate>
    </FiveBookProvider>
  );
};

export default FiveBookPage;
