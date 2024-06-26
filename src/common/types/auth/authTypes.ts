import { NextApiRequest, GetServerSidePropsContext } from 'next';
import { NotionData, NotionHelperData } from '@/common/types/notion';

export interface User {
  email: string;
  name: string;
  picture: string;
  uid: string;
}

export interface NextApiRequestWithAuth extends NextApiRequest {
  uid?: string;
  notionData?: NotionData;
  notionHelperData?: NotionHelperData;
}

export interface GetServerSidePropsContextWithAuth
  extends GetServerSidePropsContext {
  user: User | null;
  notionData?: NotionData;
  notionHelperData?: NotionHelperData;
  pages: PageInfo[];
}

export interface PageInfo {
  title: string;
  path: string;
}
