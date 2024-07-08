import { useState } from 'react';

import { GamesPageProps } from '@/gameMaps/types';
import { PageInfo } from '@/auth/types';

import { useErrorAlert } from '@/common/hooks/alerts';

import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';

import PagesList from '@/common/components/PagesList';
import GameFormModal from '@/gameMaps/components/GameFormModal';

const GamesPage = ({ user, pages, data, error }: GamesPageProps) => {
  useErrorAlert(error);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const gamePages: PageInfo[] = [
    ...(data?.map((game) => ({
      title: game.attributes.title,
      path: `/gameMaps/games/${game.id}`,
    })) ?? []),
    {
      title: '+ Add New Game',
      path: '/gameMaps/games/new',
      onClick: () => setIsGameModalOpen(true),
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

      <GameFormModal
        isModalOpen={isGameModalOpen}
        setIsModalOpen={setIsGameModalOpen}
      />
    </GameMapsTemplate>
  );
};

export default GamesPage;
