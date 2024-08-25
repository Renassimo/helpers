import {
  NotionSelectProperty,
  NotionDBSelectProperties,
} from '@/common/types/notion';

export interface FlightsDBProperties extends NotionDBSelectProperties {
  Origin: NotionSelectProperty;
  Destination: NotionSelectProperty;
  Airline: NotionSelectProperty;
  Manufacturer: NotionSelectProperty;
  'Alt airline': NotionSelectProperty;
  Model: NotionSelectProperty;
}

export interface FlightsDB {
  object: 'database';
  id: string;
  properties: FlightsDBProperties;
}
