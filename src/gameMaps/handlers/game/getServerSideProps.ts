import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { GameServerSideProps } from '@/gameMaps/types';

import GamesService from '@/gameMaps/services/games';
import PlaysService from '@/gameMaps/services/plays';

const getServerSideProps = async (
  ctx: GetServerSidePropsContextWithAuth
): Promise<GameServerSideProps> => {
  const { user, pages, query, db } = ctx;
  const { uid } = user;
  const gameId = query.id as string;

  let data = null;
  let error = null;

  const gamesService = GamesService.getInstance(db);
  const playsService = PlaysService.getInstance(db);

  try {
    const [gameData, playsData] = await Promise.all([
      gamesService.getOne(uid, gameId),
      playsService.getAll(uid, gameId),
    ]);

    data = {
      gameData,
      playsData,
    };
  } catch (err: any) {
    error = gamesService.deserializeError(err);
  }

  return {
    props: {
      user,
      pages,
      data,
      error,
    },
  };
};

export default getServerSideProps;
