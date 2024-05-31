import { PageInfo, User } from '@/auth/types';
import { CommonError } from '@/common/types/errors';

export interface GameData {
  id: string;
  attributes: GameAttributes;
}

export interface GameAttributesPartial {
  backgroundColor?: string;
  description?: string;
  mapImageUrl?: string;
  title?: string;
}

export interface GameAttributes extends GameAttributesPartial {
  backgroundColor: string;
  description: string;
  mapImageUrl: string;
  title: string;
}

export interface GamesServerSideData {
  data: GameData[] | null;
  error: CommonError | null;
}

export interface GameApiData {
  data?: GameData;
  error?: CommonError;
}

export interface GameServerSideData {
  data: GameData | null;
  error: CommonError | null;
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
