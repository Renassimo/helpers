import NotionService from '@/common/services/notion';
import { NotionError } from '@/common/types/notion';
import { FlightsDB } from '@/myFlights/types';
import { SpottingDB } from '@/spotting/types';

import mergeNotionDbSelectOptions from '@/common/utils/notion/mergeNotionDbSelectOptions';

const getOptions = async (
  notionService: NotionService,
  fligtsDbId: string,
  spottingDbId: string
) => {
  const [flightsDbResponse, spottingDbResponse] = await Promise.all([
    notionService.retreiveDatabase(fligtsDbId),
    notionService.retreiveDatabase(spottingDbId),
  ]);

  if (!flightsDbResponse.ok) {
    const error: NotionError = flightsDbResponse.data;
    throw error;
  }
  if (!spottingDbResponse.ok) {
    const error: NotionError = spottingDbResponse.data;
    throw error;
  }

  const flightsDb: FlightsDB = flightsDbResponse.data;
  const spottingDb: SpottingDB = spottingDbResponse.data;

  return mergeNotionDbSelectOptions(
    [flightsDb.properties, spottingDb.properties],
    {
      airlines: [['Airline', 'Alt airline'], ['Carrier']],
      airports: [['Origin', 'Destination'], ['Place']],
      manufacturers: [['Manufacturer'], ['Manufacturer']],
      models: [['Model'], ['Model']],
    }
  );
};

export default getOptions;
