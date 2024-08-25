import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';
import { Avia } from '@/avia/types/avia';

export const deserializeFlights = (
  results: AeroDataBoxApi.Flight[]
): Avia.FlightData[] => {
  return results.map((result: AeroDataBoxApi.Flight): Avia.FlightData => {
    const {
      number: flightNumber,
      departure,
      arrival,
      greatCircleDistance,
      airline,
      aircraft,
    } = result;
    const { airport: originPoint } = departure;
    const { airport: destinationPoint } = arrival;

    const date =
      (departure.scheduledTime?.local ?? departure.revisedTime?.local)?.split(
        ' '
      )[0] ?? '';

    const id = `${flightNumber}__${date}`;

    return {
      id,
      attributes: {
        flightNumber,
        origin: `${originPoint.iata}/${originPoint.icao}`,
        originName: originPoint.name ?? null,
        destination: `${destinationPoint.iata}/${destinationPoint.icao}`,
        destinationName: destinationPoint.name ?? null,
        distance: Math.round(greatCircleDistance.km),
        date: date,
        airline: airline?.name ?? null,
        aircraft: aircraft?.model ?? null,
        registration: aircraft?.reg ?? null,
        photoUrl: aircraft?.image?.url ?? null,
      },
    };
  });
};
