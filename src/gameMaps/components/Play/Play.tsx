import dynamic from 'next/dynamic';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import usePlay from '@/gameMaps/hooks/usePlay';

import PlayFormModal from '@/gameMaps/components/PlayFormModal';
import PlayMapMenu from '@/gameMaps/components/PlayMapMenu';

const PlayMap = dynamic(() => import('@/gameMaps/components/PlayMap'), {
  loading: () => <Typography>Map Loading...</Typography>,
  ssr: false,
});

const Play = () => {
  const { game, play, updateSubmittedPlay, isPlayEditOpen, setIsPlayEditOpen } =
    usePlay();
  const gameId = game?.id;

  return (
    <Box mt={2} flexGrow={1} pb={4}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} md={4}>
          <PlayMapMenu />
        </Grid>
        <Grid item xs={12} md={8} sx={{ height: '100%' }}>
          <PlayMap />
        </Grid>
        {gameId && (
          <PlayFormModal
            isModalOpen={isPlayEditOpen}
            setIsModalOpen={setIsPlayEditOpen}
            onFinish={updateSubmittedPlay}
            gameId={gameId}
            data={play}
          />
        )}
      </Grid>
    </Box>
  );
};

export default Play;
