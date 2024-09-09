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
    const { airport: originPoint } = departure ?? {};
    const { airport: destinationPoint } = arrival ?? {};

    const date =
      (departure?.scheduledTime?.local ?? departure?.revisedTime?.local)?.split(
        ' '
      )[0] ?? '';

    const id = `${flightNumber}__${date}`;
    const originIata = originPoint?.iata ?? '';
    const originIcao = originPoint?.icao ?? '';
    const destinationIata = destinationPoint?.iata ?? '';
    const destinationIcao = destinationPoint?.icao ?? '';

    return {
      id,
      attributes: {
        flightNumber,
        origin: `${originIata ?? ''}${originIata && originIcao && '/'}${
          originIcao ?? ''
        }`,
        originName: originPoint?.name ?? '',
        destination: `${destinationIata ?? ''}${
          destinationIata && destinationIcao && '/'
        }${destinationIcao ?? ''}`,
        destinationName: destinationPoint?.name ?? '',
        originLocation: originPoint?.location ?? null,
        destinationLocation: destinationPoint?.location ?? null,
        distance: greatCircleDistance
          ? Math.round(greatCircleDistance.km)
          : null,
        date: date,
        airline: airline?.name ?? null,
        aircraft: aircraft?.model ?? null,
        registration: aircraft?.reg ?? null,
        photoUrl: aircraft?.image?.url ?? null,
      },
    };
  });
};
