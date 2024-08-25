import { NextApiRequest, GetServerSidePropsContext } from 'next';
import { Firestore } from '@/common/lib/firebase/types';

import { NotionHelperData } from '@/common/types/notion';
import { HelpersData } from '@/common/types/helpers';
import { AeroDataBoxHelperData } from '@/avia/types/aeroDataBox';

export interface User {
  email: string;
  name: string;
  picture: string;
  uid: string;
}

export interface NextApiRequestWithAuth extends NextApiRequest {
  uid: string;
  helpersData?: HelpersData;
  notionHelperData?: NotionHelperData;
  aeroDataBoxHelperData?: AeroDataBoxHelperData;
  db: Firestore;
}

export interface GetServerSidePropsContextWithAuth
  extends GetServerSidePropsContext {
  user: User;
  helpersData?: HelpersData;
  notionHelperData?: NotionHelperData;
  pages: PageInfo[];
  db: Firestore;
}

export interface PageInfo {
  title: string;
  path: string;
  onClick?: () => void;
}

export interface ServerSideUserData {
  user: User | null;
  helpersData: HelpersData | null;
}
