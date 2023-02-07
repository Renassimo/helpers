export interface NotionProjectData {
  dataBaseID: string;
  token: string;
}

export interface NotionData {
  fiveBook?: NotionProjectData;
  spotting?: NotionProjectData;
}

export interface NotionDataBaseResponse {
  has_more: boolean;
  next_cursor: string | null;
  object: string;
  page: object;
  results: NotionResult[];
  type: string;
}

export interface NotionError {
  code?: string;
  message?: string;
  object?: 'error';
  status: number;
}

export interface NotionResult {
  archived: boolean;
  cover: string | null;
  created_by: NotionUpdatedBy;
  created_time: string;
  icon: string | null;
  id: string;
  last_edited_by: NotionUpdatedBy;
  object: string;
  parent: {
    database_id: string;
    id: string;
  };
  properties: NotionProperties;
  url: string;
}

export interface NotionUpdatedBy {
  id: string;
  object: string;
}

export interface NotionProperties {
  [key: string]: NotionUniversalProperty;
}

export interface NotionProperty {
  id: string;
  type: string;
}

export interface NotionUniversalProperty extends NotionProperty {
  id: string;
  type: string;
  title?: NotionText;
  number?: number;
  created_time?: string;
  rich_text?: NotionText[];
}

export interface NotionText {
  annotations: object;
  href: string | null;
  plain_text: string;
  text: object;
  type: 'text';
}
