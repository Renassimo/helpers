import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import PageTemplate from '@/common/templates/PageTemplate';

import { useErrorAlert } from '@/common/hooks/alerts';

import { PlayPageProps } from '@/gameMaps/types';

const PlayPage = ({ user, pages, data, error }: PlayPageProps) => {
  useErrorAlert(error);

  const { gameData, playData, categoriesData, itemsData } = data ?? {};

  console.log({ gameData, playData, categoriesData, itemsData });

  return (
    <PageTemplate title="Game Maps" user={user} pages={pages}>
      {data && (
        <>
          <Typography component="h1" variant="h5" textAlign="center" mt={5}>
            {gameData?.attributes.title}
          </Typography>
          <Typography component="h2" variant="h5" textAlign="center" mt={2}>
            {gameData?.attributes.description}
          </Typography>
          <Typography component="h2" variant="h5" textAlign="center" mt={5}>
            {playData?.attributes.title}
          </Typography>
          <Typography
            component="h2"
            variant="h5"
            textAlign="center"
            mt={2}
            mb={5}
          >
            {playData?.attributes.description}
          </Typography>
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
    </PageTemplate>
  );
};

export default PlayPage;
