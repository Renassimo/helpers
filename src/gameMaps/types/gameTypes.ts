import { PageInfo, User } from '@/auth/types';
import { CommonError } from '@/common/types/errors';

export interface GameData {
  id: string;
  attributes: GameAttributes;
}

export interface GameAttributes {
  backgroundColor: string;
  description: string;
  mapImageUrl: string;
  title: string;
}

export interface GamesPageProps {
  user: User;
  pages: PageInfo[];
  data: GameData[] | null;
  error: CommonError | null;
}

export interface GamesServerSideProps {
  props: GamesPageProps;
}
