import { PageInfo, User } from '@/auth/types';
import { CommonError } from '@/common/types/errors';

export interface PlayData {
  id: string;
  attributes: PlayAttributes;
}

export interface PlayAttributesPartial {
  title?: string;
  description?: string;
  gameId?: string;
  lastUpdateDate?: string;
  startDate?: string;
}

export interface PlayAttributes extends PlayAttributesPartial {
  title: string;
  description: string;
  gameId: string;
  lastUpdateDate: string;
  startDate: string;
}

export interface PlaysServerSideData {
  data: PlayData[] | null;
  error: CommonError | null;
}

export interface PlayApiData {
  data?: PlayData;
  error?: CommonError;
}

export interface PlayServerSideData {
  data: PlayData | null;
  error: CommonError | null;
}

export interface PlaysPageProps {
  user: User;
  pages: PageInfo[];
  data: PlayData[] | null;
  error: CommonError | null;
}

export interface PlaysServerSideProps {
  props: PlaysPageProps;
}
