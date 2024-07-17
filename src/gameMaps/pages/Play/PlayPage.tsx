import { useState } from 'react';
import { useRouter } from 'next/router';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';
import PlayFormModal from '@/gameMaps/components/PlayFormModal';

import { useErrorAlert } from '@/common/hooks/alerts';

import { PlayData, PlayPageProps } from '@/gameMaps/types';
import { BreadcrumbsItem } from '@/common/types/props';

const PlayPage = ({ user, pages, data, error }: PlayPageProps) => {
  useErrorAlert(error);
  const { push } = useRouter();

  const { gameData, categoriesData, itemsData } = data ?? {};

  const [playData, setPlayData] = useState<PlayData | null>(
    data?.playData ?? null
  );

  const gameId = gameData?.id;

  const gameTitle = gameData?.attributes.title ?? 'Game';
  const playTitle = playData?.attributes.title ?? 'Play';
  const title = `${gameTitle} - ${playTitle}`;

  const parentPageHref = `/gameMaps/games/${gameData?.id}`;

  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  const updatePlayOnState = (newData: PlayData | null) => {
    if (newData == null) push(parentPageHref);
    setPlayData(newData);
  };

  const handleEdit = () => {
    setIsPlayModalOpen(true);
  };

  const breadcrumbs: BreadcrumbsItem[] = [
    { title: 'Games', href: '/gameMaps/games' },
    {
      title: gameTitle,
      href: parentPageHref,
    },
    {
      title: playTitle,
      href: `/gameMaps/games/${gameData?.id}/plays/${playData?.id}`,
      action: handleEdit,
    },
  ];

  console.log({ gameData, playData, categoriesData, itemsData });

  return (
    <GameMapsTemplate
      title={title}
      user={user}
      pages={pages}
      description={playData?.attributes.description || title}
      breadcrumbs={breadcrumbs}
    >
      {data && gameId && (
        <>
          {categoriesData?.length && (
            <List
              sx={{ width: '100%', maxWidth: 960, bgcolor: 'background.paper' }}
            >
              {categoriesData?.map((category) => (
                <ListItem key={category.id}>
                  <ListItemText
                    primary={category.attributes.title}
                    secondary={category.attributes.description}
                  />
                  {itemsData?.length && (
                    <List>
                      {itemsData
                        ?.filter(
                          (item) => item.attributes.categoryId === category.id
                        )
                        .map((item) => (
                          <ListItem key={item.id}>
                            <ListItemText
                              primary={item.attributes.description}
                              secondary={
                                item.attributes.collected ? '✅' : '❌'
                              }
                            />
                          </ListItem>
                        ))}
                    </List>
                  )}
                </ListItem>
              ))}
            </List>
          )}
          <PlayFormModal
            isModalOpen={isPlayModalOpen}
            setIsModalOpen={setIsPlayModalOpen}
            onFinish={updatePlayOnState}
            gameId={gameData?.id}
            data={playData}
          />
        </>
      )}
    </GameMapsTemplate>
  );
};

export default PlayPage;
