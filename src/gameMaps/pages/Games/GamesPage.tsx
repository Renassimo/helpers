import { useState } from 'react';

import { GameData, GamesPageProps } from '@/gameMaps/types';
import { PageInfo } from '@/auth/types';

import useAlerts, { useErrorAlert } from '@/common/hooks/alerts';

import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';

import PagesList from '@/common/components/PagesList';
import GameFormModal from '@/gameMaps/components/GameFormModal';

const GamesPage = ({
  user,
  pages,
  data: retrievedData,
  error,
}: GamesPageProps) => {
  useErrorAlert(error);
  const { createSuccessAlert } = useAlerts();

  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [data, setData] = useState(retrievedData);

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

  const addGameToState = (newData: GameData | null) => {
    if (newData) {
      setData((current) => [...(current ?? []), newData]);
      createSuccessAlert(`New "${newData.attributes.title}" game was created!`);
    }
  };

  return (
    <PageTemplateWithBreadcrumbs
      title="Game Maps"
      user={user}
      pages={pages}
      description="Game Maps"
    >
      {data && <PagesList pages={gamePages} />}

      <GameFormModal
        isModalOpen={isGameModalOpen}
        setIsModalOpen={setIsGameModalOpen}
        onFinish={addGameToState}
      />
    </PageTemplateWithBreadcrumbs>
  );
};

export default GamesPage;
