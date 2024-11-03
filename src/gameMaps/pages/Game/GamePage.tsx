import { useState } from 'react';
import { useRouter } from 'next/router';

import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';
import PlayCards from '@/gameMaps/components/PlayCards';
import GameFormModal from '@/gameMaps/components/GameFormModal';
import PlayFormModal from '@/gameMaps/components/PlayFormModal';

import useAlerts, { useErrorAlert } from '@/common/hooks/alerts';

import { GameData, GamePageProps, PlayData } from '@/gameMaps/types';
import { BreadcrumbsItem } from '@/common/types/props';

const GamePage = ({ user, pages, data, error }: GamePageProps) => {
  useErrorAlert(error);
  const { createSuccessAlert } = useAlerts();
  const { push } = useRouter();

  const [gameData, setGameData] = useState<GameData | null>(
    data?.gameData ?? null
  );
  const gameId = gameData?.id;
  const [playsData, setPlaysData] = useState<PlayData[]>(data?.playsData ?? []);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  const title = gameData?.attributes.title ?? 'Game';

  const handleEdit = () => {
    setIsGameModalOpen(true);
  };

  const parentPageHref = '/gameMaps/games';

  const breadcrumbs: BreadcrumbsItem[] = [
    { title: 'Games', href: parentPageHref },
    {
      title,
      href: `/gameMaps/games/${gameData?.id}/edit`,
      action: handleEdit,
    },
  ];

  const updateGameOnState = (newData: GameData | null) => {
    if (newData == null) {
      push(parentPageHref);
      createSuccessAlert(`Game was deleted!`);
    } else {
      createSuccessAlert(`"${newData.attributes.title}" game was updated!`);
      setGameData(newData);
    }
  };

  const addPlayToState = (newData: PlayData | null) => {
    if (newData) {
      setPlaysData((current) => [...(current ?? []), newData]);
      createSuccessAlert(`New "${newData.attributes.title}" play was created!`);
    }
  };

  const onAddNewPlayClicked = () => {
    setIsPlayModalOpen(true);
  };

  return (
    <PageTemplateWithBreadcrumbs
      title={title}
      user={user}
      pages={pages}
      description={gameData?.attributes.description || title}
      breadcrumbs={breadcrumbs}
    >
      {gameId && (
        <>
          <PlayCards
            data={playsData}
            gameId={gameData?.id}
            onAddNewPlay={onAddNewPlayClicked}
          />
          <GameFormModal
            isModalOpen={isGameModalOpen}
            setIsModalOpen={setIsGameModalOpen}
            onFinish={updateGameOnState}
            data={gameData}
          />
          <PlayFormModal
            isModalOpen={isPlayModalOpen}
            setIsModalOpen={setIsPlayModalOpen}
            onFinish={addPlayToState}
            gameId={gameData?.id}
          />
        </>
      )}
    </PageTemplateWithBreadcrumbs>
  );
};

export default GamePage;
