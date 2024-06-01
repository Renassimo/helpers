import { PageInfo, User } from '@/auth/types';
import { CommonError } from '@/common/types/errors';

export interface ItemData {
  id: string;
  attributes: ItemAttributes;
}

export interface ItemAttributes {
  categoryId: string;
  collected: boolean;
  coordinates: object;
  description: string;
  imageUrl: string;
  playId: string;
}

export interface ItemsPageProps {
  user: User;
  pages: PageInfo[];
  data: ItemData[] | null;
  error: CommonError | null;
}

export interface ItemsServerSideProps {
  props: ItemsPageProps;
}
