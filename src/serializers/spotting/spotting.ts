import { NotionResult } from '@/types/notion';
import {
  SpottedPlaneDescription,
  SpottedPlaneFirstFlight,
  SpottedPlaneGroup,
} from '@/types/spotting';

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
        photoUrl: photoUrls[id] ?? null,
      },
    };
  });
};

export const serializeSpottedPlanes = (data: SpottedPlaneDescription[]) => {
  return data.map((spottedPlane: SpottedPlaneDescription) => {
    const { id, attributes } = spottedPlane;
    const {
      description,
      hashtags,
      newFirstFlight,
      groupName,
      groupDescription,
      groupHashtags,
    } = attributes;

    const text = `${description}\n${hashtags}`;

    const group: SpottedPlaneGroup | Record<string, never> =
      groupName && groupDescription && groupHashtags
        ? {
            'Group post': { checkbox: true },
            'Group text': {
              type: 'rich_text',
              rich_text: [
                {
                  text: { content: `${groupDescription}\n${groupHashtags}` },
                },
              ],
            },
            Group: { select: { name: groupName || 'Default' } },
          }
        : {};

    const firstFlight: SpottedPlaneFirstFlight | Record<string, never> =
      newFirstFlight
        ? {
            'First flight': {
              date: { start: newFirstFlight },
            },
          }
        : {};

    return {
      id,
      body: {
        icon: { type: 'emoji', emoji: '✈️' },
        properties: {
          'Ready to publish': {
            checkbox: true,
          },
          Text: {
            type: 'rich_text',
            rich_text: [
              {
                text: { content: text },
              },
            ],
          },
          ...firstFlight,
          ...group,
        },
      },
    };
  });
};
