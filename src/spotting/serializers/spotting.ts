import { NotionResult } from '@/common/types/notion';
import {
  PhotoFolderInfoData,
  SpottedPlaneCreatedData,
  SpottedPlaneFirstFlight,
  SpottedPlaneGroup,
} from '@/spotting/types';

import NotionPropertiesDeserializer from '@/common/serializers/notion';
import NotionPropertiesSerializer from '@/common/serializers/notion/propertiesSerializer';

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

export const serializeSpottedPlanes = (data: SpottedPlaneCreatedData[]) => {
  return data.map((spottedPlane: SpottedPlaneCreatedData) => {
    const { id, attributes } = spottedPlane;
    const {
      description,
      hashtags,
      newFirstFlight,
      groupName,
      groupDescription,
      groupHashtags,
    } = attributes;

    const text = `${description}\n\n${hashtags}`;

    const group: SpottedPlaneGroup | Record<string, never> =
      groupName && groupDescription && groupHashtags
        ? {
            'Group post': { checkbox: true },
            'Group text': {
              type: 'rich_text',
              rich_text: [
                {
                  text: { content: `${groupDescription}\n\n${groupHashtags}` },
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

export const serializePhotoInfo = (data: PhotoFolderInfoData) => {
  const { attributes } = data;
  const serializer = new NotionPropertiesSerializer(attributes);

  return {
    icon: { type: 'emoji', emoji: '📷' },
    properties: {
      ...serializer.getName('title'),
      ...serializer.getDate('Spotted date', 'date'),
      ...serializer.getSelect('Place', 'place'),
      ...serializer.getUrl('Photos URL', 'photosUrl'),
      ...serializer.getUrl('Extra link', 'extraLink'),
      ...serializer.getUrl('Planespotters URL', 'planespottersUrl'),
      ...serializer.getRichText('Registration', 'registration'),
      ...serializer.getSelect('Carrier', 'carrier'),
      ...serializer.getSelect('Manufacturer', 'manufacturer'),
      ...serializer.getSelect('Model', 'model'),
      ...serializer.getDate('First flight', 'firstFlight'),
      ...serializer.getRichText('CN / MSN', 'cn'),
      ...serializer.getRichText('Airplane Name / Marks', 'airplaneName'),
      ...serializer.getCheckbox('Flown', 'flown'),
      ...serializer.getCheckbox('Modelled', 'modelled'),
      ...serializer.getCheckbox('Info Ready', 'infoReady'),
      ...serializer.getCheckbox('Ready to publish', 'readyToPublish'),
      ...serializer.getSelect('Rating', 'rating'),
      ...serializer.getRichText('Age', 'age'),
    },
  };
};

export const deserializePhotoInfo = (
  result: NotionResult
): PhotoFolderInfoData => {
  const deserializer = new NotionPropertiesDeserializer(result);
  const id = deserializer.id;

  return {
    id,
    attributes: {
      title: deserializer.getTextAttribute('Name', true),
      date: deserializer.getDateAttribute('Spotted date'),
      place: deserializer.getSelectAttribute('Place'),
      photosUrl: deserializer.getUrlAttribute('Photos URL'),
      extraLink: deserializer.getUrlAttribute('Extra link'),
      planespottersUrl: deserializer.getUrlAttribute('Planespotters URL'),
      registration: deserializer.getTextAttribute('Registration'),
      carrier: deserializer.getSelectAttribute('Carrier'),
      manufacturer: deserializer.getSelectAttribute('Manufacturer'),
      model: deserializer.getSelectAttribute('Model'),
      firstFlight: deserializer.getDateAttribute('First flight'),
      cn: deserializer.getTextAttribute('CN / MSN'),
      airplaneName: deserializer.getTextAttribute('Airplane Name / Marks'),
      flown: deserializer.getCheckboxAttribute('Flown'),
      modelled: deserializer.getCheckboxAttribute('Modelled'),
      infoReady: deserializer.getCheckboxAttribute('Info Ready'),
      readyToPublish: deserializer.getCheckboxAttribute('Ready to publish'),
      rating: deserializer.getSelectAttribute('Rating'),
      age: deserializer.getTextAttribute('Age'),
      url: deserializer.url,
    },
  };
};
