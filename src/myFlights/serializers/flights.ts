import { NotionResult } from '@/common/types/notion';

import NotionPropertiesDeserializer from '@/common/serializers/notion';
import { MyFlightData } from '@/myFlights/types';

export const deserializeFlights = (results: NotionResult[]): MyFlightData[] => {
  return results.map((result: NotionResult, index) => {
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
        number: index + 1,
      },
    };
  });
};
