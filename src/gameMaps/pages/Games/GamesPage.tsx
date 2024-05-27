import Typography from '@mui/material/Typography';

import { GamesPageProps } from '@/gameMaps/types';
import { PageInfo } from '@/common/types/auth';

import { useErrorAlert } from '@/common/hooks/alerts';

import PagesList from '@/common/components/PagesList';
import PageTemplate from '@/common/templates/PageTemplate';

const GamesPage = ({ user, pages, data, error }: GamesPageProps) => {
  useErrorAlert(error);

  console.log({
    user,
    pages,
    data,
    error,
  });
  const gamePages: PageInfo[] = [
    ...(data?.map((game) => ({
      title: game.attributes.title,
      path: `/gameMaps/games/${game.id}`,
    })) ?? []),
    { title: '+ Add New Game', path: '/gameMaps/games/new' },
  ];
  return (
    <PageTemplate title="Game Maps" user={user} pages={pages}>
      <Typography component="h1" variant="h5" textAlign="center" mt={5}>
        Games Page
      </Typography>
      {data && <PagesList pages={gamePages} />}
    </PageTemplate>
  );
};

export default GamesPage;
