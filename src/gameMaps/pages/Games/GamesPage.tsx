import { GamesPageProps } from '@/gameMaps/types';
import { PageInfo } from '@/auth/types';

import { useErrorAlert } from '@/common/hooks/alerts';

import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';

import PagesList from '@/common/components/PagesList';

const GamesPage = ({ user, pages, data, error }: GamesPageProps) => {
  useErrorAlert(error);

  const gamePages: PageInfo[] = [
    ...(data?.map((game) => ({
      title: game.attributes.title,
      path: `/gameMaps/games/${game.id}`,
    })) ?? []),
    {
      title: '+ Add New Game',
      path: '/gameMaps/games/new',
      onClick: () => console.log('New!'),
    },
  ];

  return (
    <GameMapsTemplate
      title="Game Maps"
      user={user}
      pages={pages}
      description="Game Maps"
    >
      {data && <PagesList pages={gamePages} />}
    </GameMapsTemplate>
  );
};

export default GamesPage;
