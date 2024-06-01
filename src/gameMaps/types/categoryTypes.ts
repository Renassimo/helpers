import { PageInfo, User } from '@/auth/types';
import { CommonError } from '@/common/types/errors';

export interface CategoryData {
  id: string;
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  color: string;
  description: string;
  title: string;
  itemsAmount: number;
  gameId: string;
}

export interface CategoriesPageProps {
  user: User;
  pages: PageInfo[];
  data: CategoryData[] | null;
  error: CommonError | null;
}

export interface CategoriesServerSideProps {
  props: CategoriesPageProps;
}
