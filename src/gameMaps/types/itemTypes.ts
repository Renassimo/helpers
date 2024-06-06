import { Data, PageProps, ServerSideProps } from '@/common/types/props';

export interface ItemAttributes {
  categoryId: string;
  collected: boolean;
  coordinates: object;
  description: string;
  imageUrl: string;
  playId: string;
}

export type ItemData = Data<ItemAttributes>;

export type ItemPageProps = PageProps<ItemData>;
export type ItemsPageProps = PageProps<ItemData[]>;

export type ItemServerSideProps = ServerSideProps<ItemPageProps>;
export type ItemsServerSideProps = ServerSideProps<ItemsPageProps>;
