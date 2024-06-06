import { Data, PageProps, ServerSideProps } from '@/common/types/props';

export interface PlayAttributes {
  title: string;
  description: string;
  lastUpdateDate: string;
  startDate: string;
}

export type PlayData = Data<PlayAttributes>;

export type PlayPageProps = PageProps<PlayData>;
export type PlaysPageProps = PageProps<PlayData[]>;

export type PlayServerSideProps = ServerSideProps<PlayPageProps>;
export type PlaysServerSideProps = ServerSideProps<PlaysPageProps>;
