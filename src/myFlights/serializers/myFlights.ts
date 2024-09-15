import { NotionResult } from '@/common/types/notion';
import { MyFlightData } from '@/myFlights/types';

import NotionPropertiesDeserializer from '@/common/serializers/notion';
import NotionPropertiesSerializer from '@/common/serializers/notion/propertiesSerializer';

export const deserializeMyFlights = (
  results: NotionResult[]
): MyFlightData[] => {
  return results.map((result: NotionResult, index, arr) => {
    const deserializer = new NotionPropertiesDeserializer(result);
    const id = deserializer.id;

    return {
      id,
      attributes: {
        title: deserializer.getTextAttribute('Name', true),
        date: deserializer.getDateAttribute('Date'),
        airline: deserializer.getSelectAttribute('Airline'),
        flightNumber: deserializer.getTextAttribute('Flight number'),
        origin: deserializer.getSelectAttribute('Origin'),
        destination: deserializer.getSelectAttribute('Destination'),
        manufacturer: deserializer.getSelectAttribute('Manufacturer'),
        model: deserializer.getSelectAttribute('Model'),
        registration: deserializer.getTextAttribute('Registration'),
        cn: deserializer.getTextAttribute('CN / MSN'),
        firstFlight: deserializer.getDateAttribute('First flight'),
        airplaneName: deserializer.getTextAttribute('Airplane name'),
        originName: deserializer.getTextAttribute('Origin name'),
        destinationName: deserializer.getTextAttribute('Destination name'),
        seatNumber: deserializer.getTextAttribute('Seat number'),
        altAirline: deserializer.getSelectAttribute('Alt airline'),
        altFlightNumber: deserializer.getTextAttribute('Alt flight number'),
        planespottersUrl: deserializer.getUrlAttribute('Planespotters URL'),
        distance: deserializer.getNumberAttribute('Distance, km'),
        age: deserializer.getTextAttribute('Age'),
        url: deserializer.url,
        photoUrl: deserializer.cover,
        number: arr.length > 1 ? index + 1 : null,
      },
    };
  });
};

export const serializeMyFlight = (data: MyFlightData) => {
  const { attributes } = data;
  const serializer = new NotionPropertiesSerializer(attributes);

  return {
    icon: { type: 'emoji', emoji: '✈️' },
    ...serializer.getUrlCover('photoUrl'),
    properties: {
      ...serializer.getName('title'),
      ...serializer.getRichText('Age', 'age'),
      ...serializer.getRichText('Seat number', 'seatNumber'),
      ...serializer.getRichText('Destination name', 'destinationName'),
      ...serializer.getRichText('Flight number', 'flightNumber'),
      ...serializer.getRichText('Airplane name', 'airplaneName'),
      ...serializer.getRichText('CN / MSN', 'cn'),
      ...serializer.getRichText('Registration', 'registration'),
      ...serializer.getRichText('Origin name', 'originName'),
      ...serializer.getRichText('Alt flight number', 'altFlightNumber'),
      ...serializer.getDate('First flight', 'firstFlight'),
      ...serializer.getDate('Date', 'date'),
      ...serializer.getSelect('Origin', 'origin'),
      ...serializer.getSelect('Destination', 'destination'),
      ...serializer.getSelect('Airline', 'airline'),
      ...serializer.getSelect('Manufacturer', 'manufacturer'),
      ...serializer.getSelect('Alt airline', 'altAirline'),
      ...serializer.getSelect('Model', 'model'),
      ...serializer.getNumber('Distance, km', 'distance'),
      ...serializer.getUrl('Planespotters URL', 'planespottersUrl'),
    },
  };
};
