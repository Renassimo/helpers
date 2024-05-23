import Link from 'next/link';

import { PageInfo, User } from '@/types/auth';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import PageTemplate from '@/common/templates/PageTemplate';

const MainPage = ({ user, pages }: { user: User; pages: PageInfo[] }) => (
  <>
    <PageTemplate title="Main" user={user} pages={pages}>
      <Typography component="h1" variant="h5" textAlign="center" mt={5}>
        Welcome to Helpers
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mt={5}
      >
        {pages?.map(({ title, path }) => (
          <Grid item key={title} xs={10} sm={6} md={4} lg={3} xl={3}>
            <Link href={path}>
              <Paper>
                <Box p={1}>
                  <Typography component="h2" variant="h6" textAlign="center">
                    {title}
                  </Typography>
                </Box>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </PageTemplate>
  </>
);

export default MainPage;
