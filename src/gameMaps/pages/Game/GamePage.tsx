import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';
import PlayCards from '@/gameMaps/components/PlayCards';

import useErrorAlert from '@/common/hooks/alerts/useErrorAlert';

import { GamePageProps } from '@/gameMaps/types';
import { BreadcrumbsItem } from '@/common/types/props';

const GamePage = ({ user, pages, data, error }: GamePageProps) => {
  useErrorAlert(error);

  const { gameData, playsData } = data ?? {};
  const title = gameData?.attributes.title ?? 'Game';

  const breadcrumbs: BreadcrumbsItem[] = [
    { title: 'Games', href: '/gameMaps/games' },
    {
      title,
      href: `/gameMaps/games/${gameData?.id}`,
      current: true,
    },
  ];

  return (
    <GameMapsTemplate
      title={title}
      user={user}
      pages={pages}
      description={gameData?.attributes.description || title}
      breadcrumbs={breadcrumbs}
    >
      {data && (
        <>
          {playsData?.length && (
            <PlayCards data={playsData} gameId={gameData?.id} />
          )}
        </>
      )}
    </GameMapsTemplate>
  );
};

export default GamePage;
