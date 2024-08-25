export interface NotionHelperData {
  dataBaseID: string;
  token: string;
  additionalDbIds?: {
    [key: string]: string;
  };
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

export interface NotionCover {
  external?: { url: string };
  file?: { url: string };
}

export interface NotionResult {
  archived: boolean;
  cover: NotionCover | null;
  created_by: NotionUpdatedBy;
  created_time: string;
  icon: { type: string; emoji: string } | null;
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

export interface NotionBlockChildrenResult {
  archived: boolean;
  created_by: NotionUpdatedBy;
  created_time: string;
  has_children: boolean;
  id: string;
  image: NotionImageBlock;
  last_edited_by: NotionUpdatedBy;
  last_edited_by_time: string;
  object: string;
  parent: NotionParent;
  type: string;
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
  title?: NotionText[];
  number?: number;
  created_time?: string;
  rich_text?: NotionText[];
  select?: NotionSelect;
  date?: NotionDate;
  checkbox?: boolean;
  url?: string;
}

export interface NotionText {
  type: string;
  annotations: object;
  href: string | null;
  plain_text: string;
  text: object;
}

export interface NotionRichText {
  id: string;
  type: 'rich_text';
  rich_text: NotionText[];
}

export interface NotionCreatedTime {
  created_time: string;
  id: string;
  type: 'created_time';
}

export interface NotionNumber {
  id: string;
  number: number;
  type: 'number';
}

export interface NotionName {
  id: 'title';
  title: NotionText;
  type: 'title';
}

export interface NotionSelect {
  id: string;
  color: string;
  name: string;
}

export interface NotionDate {
  start: string;
  end: string | null;
  timezone: string | null;
}

export interface NotionImageBlock {
  caption: any[];
  file: NotionFile;
  type: string;
}

export interface NotionFile {
  expiry_time: string;
  url: string;
}

export interface NotionParent {
  page_id: string;
  type: string;
}

export interface NotionSelectProperty {
  id: string;
  name: string;
  type: 'select';
  select: {
    options: NotionSelect[];
  };
}

export interface NotionDBSelectProperties {
  [key: string]: NotionSelectProperty;
}
