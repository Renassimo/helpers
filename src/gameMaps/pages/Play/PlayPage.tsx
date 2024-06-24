import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import GameMapsTemplate from '@/gameMaps/templates/GameMapsTemplate';

import { useErrorAlert } from '@/common/hooks/alerts';

import { PlayPageProps } from '@/gameMaps/types';
import { BreadcrumbsItem } from '@/common/types/props';

const PlayPage = ({ user, pages, data, error }: PlayPageProps) => {
  useErrorAlert(error);

  const { gameData, playData, categoriesData, itemsData } = data ?? {};

  const gameTitle = gameData?.attributes.title ?? 'Game';
  const playTitle = playData?.attributes.title ?? 'Play';
  const title = `${gameTitle} - ${playTitle}`;

  const breadcrumbs: BreadcrumbsItem[] = [
    { title: 'Games', href: '/gameMaps/games' },
    {
      title: gameTitle,
      href: `/gameMaps/games/${gameData?.id}`,
    },
    {
      title: playTitle,
      href: `/gameMaps/games/${gameData?.id}/plays/${playData?.id}`,
      current: true,
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
      {data && (
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
        </>
      )}
    </GameMapsTemplate>
  );
};

export default PlayPage;
