import { PageInfo, User } from '@/auth/types';
import { CommonError } from '@/common/types/errors';

export interface PlayData {
  id: string;
  attributes: PlayAttributes;
}

export interface PlayAttributes {
  title: string;
  description: string;
  lastUpdateDate: string;
  startDate: string;
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
