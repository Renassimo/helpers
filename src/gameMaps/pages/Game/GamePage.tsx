import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import PageTemplate from '@/common/templates/PageTemplate';

import { useErrorAlert } from '@/common/hooks/alerts';

import { GamePageProps } from '@/gameMaps/types';

const GamePage = ({ user, pages, data, error }: GamePageProps) => {
  useErrorAlert(error);

  const { gameData, playsData } = data ?? {};

  return (
    <PageTemplate title="Game Maps" user={user} pages={pages}>
      {data && (
        <>
          <Typography component="h1" variant="h5" textAlign="center" mt={5}>
            {gameData?.attributes.title}
          </Typography>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {playsData?.map((play) => (
              <ListItem key={play.id}>
                <ListItemText secondary={play.attributes.description}>
                  {play.attributes.title}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </PageTemplate>
  );
};

export default GamePage;
