import { Data, PageProps, ServerSideProps } from '@/common/types/props';

export interface CategoryAttributes {
  color: string;
  description: string;
  title: string;
  itemsAmount: number;
}

export type CategoryData = Data<CategoryAttributes>;

export type CategoryPageProps = PageProps<CategoryData>;
export type CategoriesPageProps = PageProps<CategoryData[]>;

export type CategoryServerSideProps = ServerSideProps<CategoryPageProps>;
export type CategoriesServerSideProps = ServerSideProps<CategoriesPageProps>;
