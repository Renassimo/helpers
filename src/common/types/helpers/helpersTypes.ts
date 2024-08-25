import { AeroDataBoxHelperData } from '@/avia/types/aeroDataBox';
import { NotionHelperData } from '../notion';

export interface HelpersData {
  [key: string]: HelperData;
}

export interface HelperData {
  path?: string;
  title?: string;
  apiOnly?: boolean;
  notionData?: NotionHelperData;
  aeroDataBoxData?: AeroDataBoxHelperData;
}

export interface UserHelpersData {
  id: string;
  helpersData: HelpersData | null;
}
