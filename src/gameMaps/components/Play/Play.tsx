import dynamic from 'next/dynamic';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import usePlayContext from '@/gameMaps/contexts/hooks/usePlayContext';

import PlayFormModal from '@/gameMaps/components/PlayFormModal';
import PlayMapMenu from '@/gameMaps/components/PlayMapMenu';

const PlayMap = dynamic(() => import('@/gameMaps/components/PlayMap'), {
  loading: () => <Typography>Map Loading...</Typography>,
  ssr: false,
});

const ResponsibleContainer = styled.div(
  ({ theme }) => css`
    ${theme.breakpoints.up('md')} {
      position: absolute;
      top: 185px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
    }
    ${theme.breakpoints.down('md')} {
      height: 50vh;
    }
  `
);

const Play = () => {
  const { game, play, updateSubmittedPlay, isPlayEditOpen, setIsPlayEditOpen } =
    usePlayContext();
  const gameId = game?.id;

  return (
    <Box mt={2} flexGrow={1} pb={4}>
      <ResponsibleContainer>
        <Grid container height="100%">
          <Grid item xs={12} md={5} lg={4} xl={3}>
            <PlayMapMenu />
          </Grid>
          <Grid item xs={12} md={7} lg={8} xl={9} sx={{ height: '100%' }}>
            <PlayMap />
          </Grid>
        </Grid>
      </ResponsibleContainer>
      {gameId && (
        <PlayFormModal
          isModalOpen={isPlayEditOpen}
          setIsModalOpen={setIsPlayEditOpen}
          onFinish={updateSubmittedPlay}
          gameId={gameId}
          data={play}
        />
      )}
    </Box>
  );
};

export default Play;
