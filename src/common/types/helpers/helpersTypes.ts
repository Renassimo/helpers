import { NotionHelperData } from '../notion';

export interface HelpersData {
  [key: string]: HelperData;
}

export interface HelperData {
  path?: string;
  title?: string;
  notionData?: NotionHelperData;
}

export interface UserHelpersData {
  id: string;
  helpersData: HelpersData | null;
}
