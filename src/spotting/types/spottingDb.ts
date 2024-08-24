import {
  NotionSelectProperty,
  NotionDBSelectProperties,
} from '@/common/types/notion';

export interface SpottingDBProperties extends NotionDBSelectProperties {
  Manufacturer: NotionSelectProperty;
  Model: NotionSelectProperty;
  Carrier: NotionSelectProperty;
  Place: NotionSelectProperty;
}

export interface SpottingDB {
  object: 'database';
  id: string;
  properties: SpottingDBProperties;
}
