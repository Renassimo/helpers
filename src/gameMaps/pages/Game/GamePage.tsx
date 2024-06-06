import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import PageTemplate from '@/common/templates/PageTemplate';

import { useErrorAlert } from '@/common/hooks/alerts';

import { GamePageProps } from '@/gameMaps/types';
import Link from 'next/link';

const GamePage = ({ user, pages, data, error }: GamePageProps) => {
  useErrorAlert(error);

  const { gameData, playsData } = data ?? {};

  console.log({ gameData, playsData });

  return (
    <PageTemplate title="Game Maps" user={user} pages={pages}>
      {data && (
        <>
          <Typography component="h1" variant="h5" textAlign="center" mt={5}>
            {gameData?.attributes.title}
          </Typography>
          <Typography
            component="h2"
            variant="h5"
            textAlign="center"
            mt={2}
            mb={5}
          >
            {gameData?.attributes.description}
          </Typography>
          {playsData?.length && (
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {playsData?.map((play) => (
                <ListItem key={play.id}>
                  <Link
                    href={{
                      pathname: '/gameMaps/games/[gameId]/plays/[playId]',
                      query: { gameId: gameData?.id, playId: play.id },
                    }}
                  >
                    <ListItemText
                      primary={play.attributes.title}
                      secondary={play.attributes.description}
                    />
                  </Link>
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </PageTemplate>
  );
};

export default GamePage;
