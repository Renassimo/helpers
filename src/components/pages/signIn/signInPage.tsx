import Head from 'next/head';
import styled from '@emotion/styled';

import useAuth from '@/hooks/useAuth';

import { User } from '@/types/auth';

import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(
    0deg,
    rgba(255, 254, 252, 1) 0%,
    rgba(223, 232, 255, 1) 100%
  );
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
`;

const SignInPage = ({ user: serverSideUser }: { user: User }) => {
  const { signIn } = useAuth(serverSideUser);
  return (
    <>
      <Head>
        <title>Helpers - Sign In</title>
      </Head>
      <Wrapper>
        <Container fixed>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Grid item xs={8} sm={6} md={4} lg={3} xl={3}>
              <Paper>
                <Box
                  p={4}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="center"
                  minHeight="320px"
                >
                  <Img src="/notion-hello.png" alt="Hello" />
                  <Typography component="h1" variant="h6" textAlign="center">
                    Welcome to Helpers
                  </Typography>
                  <Button
                    onClick={() => signIn('/')}
                    startIcon={<GoogleIcon />}
                    type="button"
                    variant="outlined"
                    fullWidth
                  >
                    Sign In
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Wrapper>
    </>
  );
};

export default SignInPage;
