import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { PlayServerSideProps } from '@/gameMaps/types';

import GamesService from '@/gameMaps/services/games';
import PlaysService from '@/gameMaps/services/plays';
import CategoriesService from '@/gameMaps/services/categories';
import ItemsService from '@/gameMaps/services/items';

const getServerSideProps = async (
  ctx: GetServerSidePropsContextWithAuth
): Promise<PlayServerSideProps> => {
  const { user, pages, query, db } = ctx;
  const { uid } = user;
  const gameId = query.gameId as string;
  const playId = query.playId as string;

  let data = null;
  let error = null;

  const gamesService = GamesService.getInstance(db);
  const playsService = PlaysService.getInstance(db);
  const categoriesService = CategoriesService.getInstance(db);
  const itemsService = ItemsService.getInstance(db);

  try {
    const [gameData, playData, categoriesData, itemsData] = await Promise.all([
      gamesService.getOne(uid, gameId),
      playsService.getOne(uid, gameId, playId),
      categoriesService.getAll(uid, gameId),
      itemsService.getAll(uid, gameId, playId),
    ]);

    data = {
      gameData,
      playData,
      categoriesData,
      itemsData,
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
