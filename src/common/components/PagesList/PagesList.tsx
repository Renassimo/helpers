import Link from 'next/link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { PageInfo } from '@/auth/types';

const PagesList = ({ pages }: { pages: PageInfo[] }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      mt={5}
    >
      {pages?.map(({ title, path, onClick }) => (
        <Grid item key={title} xs={10} sm={6} md={4} lg={3} xl={3}>
          <Link
            href={path}
            onClick={(event) => {
              if (onClick) {
                event.preventDefault();
                onClick();
              }
            }}
          >
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
  );
};

export default PagesList;
