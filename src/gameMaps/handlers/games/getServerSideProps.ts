import { getFirestore } from 'firebase-admin/firestore';

import { GetServerSidePropsContextWithAuth } from '@/auth/types';
import { GamesServerSideProps } from '@/gameMaps/types';

import GamesService from '@/gameMaps/services/games';

const getServerSideProps = async (
  ctx: GetServerSidePropsContextWithAuth
): Promise<GamesServerSideProps> => {
  const { user, pages } = ctx;
  const { uid } = user;

  const gamesService = GamesService.getInstance(getFirestore());
  const { data, error } = await gamesService.getAll(uid);

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
