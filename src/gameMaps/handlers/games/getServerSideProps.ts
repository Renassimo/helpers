import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { GamesServerSideProps } from '@/gameMaps/types';

import GamesService from '@/gameMaps/services/games';

const getServerSideProps = async (
  ctx: GetServerSidePropsContextWithAuth
): Promise<GamesServerSideProps> => {
  const { user, pages } = ctx;
  const { uid } = user;

  let data = null;
  let error = null;

  const gamesService = GamesService.getInstance(ctx.db);

  try {
    data = await gamesService.getAll(uid);
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
