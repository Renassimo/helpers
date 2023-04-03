import { NotionResult } from '@/types/notion';

import NotionPropertiesDeserializer from '@/serializers/notion';

export const deserializeSpottedPlanes = (
  results: NotionResult[],
  photoUrls: Record<string, string>
) => {
  return results.map((result: NotionResult) => {
    const deserializer = new NotionPropertiesDeserializer(result);
    const id = deserializer.id;

    return {
      id,
      attributes: {
        airplaneName: deserializer.getTextAttribute('Airplane Name / Marks'),
        cn: deserializer.getTextAttribute('CN / MSN'),
        carrier: deserializer.getSelectAttribute('Carrier'),
        firstFlight: deserializer.getDateAttribute('First flight'),
        flown: deserializer.getCheckboxAttribute('Flown'),
        groupPost: deserializer.getCheckboxAttribute('Group post'),
        manufacturer: deserializer.getSelectAttribute('Manufacturer'),
        model: deserializer.getSelectAttribute('Model'),
        modelled: deserializer.getCheckboxAttribute('Modelled'),
        name: deserializer.getTextAttribute('Name', true),
        photosUrl: deserializer.getUrlAttribute('Photos URL'),
        place: deserializer.getSelectAttribute('Place'),
        planespottersUrl: deserializer.getUrlAttribute('Planespotters URL'),
        registration: deserializer.getTextAttribute('Registration'),
        spottedDate: deserializer.getDateAttribute('Spotted date'),
        url: deserializer.url,
        photoUrl: photoUrls[id],
      },
    };
  });
};
