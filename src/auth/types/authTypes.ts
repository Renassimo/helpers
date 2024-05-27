import { NextApiRequest, GetServerSidePropsContext } from 'next';
import { NotionHelperData } from '@/common/types/notion';
import { HelpersData } from '@/common/types/helpers';

export interface User {
  email: string;
  name: string;
  picture: string;
  uid: string;
}

export interface NextApiRequestWithAuth extends NextApiRequest {
  uid?: string;
  helpersData?: HelpersData;
  notionHelperData?: NotionHelperData;
}

export interface GetServerSidePropsContextWithAuth
  extends GetServerSidePropsContext {
  user: User;
  helpersData?: HelpersData;
  notionHelperData?: NotionHelperData;
  pages: PageInfo[];
}

export interface PageInfo {
  title: string;
  path: string;
}

export interface ServerSideUserData {
  user: User | null;
  helpersData: HelpersData | null;
}
