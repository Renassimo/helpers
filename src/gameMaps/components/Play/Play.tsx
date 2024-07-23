import Grid from '@mui/material/Grid';

import usePlay from '@/gameMaps/hooks/usePlay';

import PlayFormModal from '@/gameMaps/components/PlayFormModal';
import PlayMap from '@/gameMaps/components/PlayMap';
import PlayMapMenu from '@/gameMaps/components/PlayMapMenu';

const Play = () => {
  const { game, play, updateSubmittedPlay, isPlayEditOpen, setIsPlayEditOpen } =
    usePlay();
  const gameId = game?.id;

  return (
    <Grid container spacing={2}>
      <Grid sm={12} md={4}>
        <PlayMapMenu />
      </Grid>
      <Grid sm={12} md={8}>
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
  );
};

export default Play;
