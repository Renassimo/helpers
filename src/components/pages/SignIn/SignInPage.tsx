import Head from 'next/head';
import styled from '@emotion/styled';

import useAuth from '@/hooks/useAuth';

import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import PageWrapper from '@/common/components/PageWrapper';

const Img = styled.img`
  width: 150px;
  height: 150px;
`;

const SignInPage = () => {
  const { signIn } = useAuth();
  return (
    <>
      <Head>
        <title>Helpers - Sign In</title>
      </Head>
      <PageWrapper>
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
      </PageWrapper>
    </>
  );
};

export default SignInPage;
