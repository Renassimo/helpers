import { FiveBookData } from '@/types/fiveBook';
import { NotionError } from '@/types/notion';
import { PageInfo, User } from '@/types/auth';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Grid from '@mui/material/Grid';

import PageTemplate from '@/components/templates/PageTemplate';
import CreateAnswerCard from '@/components/fiveBook/CreateAnswerCard';
import AnswersCard from '@/components/fiveBook/AnswersCard';
import FiveBookProvider from '@/providers/fiveBook/fiveBookProvider';
import DayLink from '@/components/fiveBook/DayLink';

const FiveBookPage = ({
  user,
  pages,
  data,
  error,
}: {
  user: User;
  pages: PageInfo[];
  data: FiveBookData;
  error: NotionError;
}) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <FiveBookProvider data={data}>
      <PageTemplate title="5book" user={user} pages={pages}>
        {data && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mt={2}
          >
            {isMediumScreen && (
              <Grid item md={1} textAlign="center">
                <DayLink prev />
              </Grid>
            )}
            <Grid item xs={12} sm={10} md={5}>
              <CreateAnswerCard />
            </Grid>
            <Grid item xs={12} sm={10} md={5}>
              <AnswersCard />
            </Grid>
            {isMediumScreen && (
              <Grid item md={1} textAlign="center">
                <DayLink next />
              </Grid>
            )}
          </Grid>
        )}
        {error && <h3>Error: {error.message}</h3>}
      </PageTemplate>
    </FiveBookProvider>
  );
};

export default FiveBookPage;
