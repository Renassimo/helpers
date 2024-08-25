import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';
import { Avia } from '@/avia/types/avia';

export const deserializeAirports = (
  results: (AeroDataBoxApi.Airport | AeroDataBoxApi.AirportExact)[]
): Avia.AirportData[] => {
  return results.map(
    (
      result: AeroDataBoxApi.Airport | AeroDataBoxApi.AirportExact
    ): Avia.AirportData => {
      const { iata, icao, name, fullName, municipalityName, shortName } =
        result;
      const airportCode = `${iata}/${icao}`;

      return {
        id: airportCode,
        attributes: {
          airportCode: airportCode,
          airportName: name ?? fullName ?? null,
          municipalityName: municipalityName ?? null,
          shortName: shortName ?? null,
        },
      };
    }
  );
};
