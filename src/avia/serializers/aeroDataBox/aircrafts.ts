import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';
import { Avia } from '@/avia/types/avia';
import { MyFlightData } from '@/myFlights/types';

export const deserializeAircrafts = (
  results: AeroDataBoxApi.Aircraft[]
): Avia.AircraftData[] => {
  const data: Avia.AircraftData[] = [];

  results.forEach((result: AeroDataBoxApi.Aircraft): void => {
    const id = String(result.id);
    const {
      reg,
      serial,
      airlineName,
      modelCode,
      model,
      typeName,
      productionLine,
      isFreighter,
      firstFlightDate,
      rolloutDate,
      deliveryDate,
      image,
    } = result;
    if (data.find((item) => item.id === id)) return;

    data.push({
      id,
      attributes: {
        registration: reg,
        serial: serial ?? null,
        airlineName: airlineName ?? null,
        modelCode: modelCode ?? null,
        model: model ?? null,
        typeName: typeName ?? null,
        productionLine: productionLine ?? null,
        isFreighter: isFreighter ?? null,
        firstFlightDate: firstFlightDate ?? null,
        rolloutDate: rolloutDate ?? null,
        deliveryDate: deliveryDate ?? null,
        photoUrl: image?.url ?? null,
        airplaneName: null,
        source: 'aerodatabox',
      },
    });
  });

  return data;
};

export const convertMyFlightsToAircrafts = (
  myFlights: MyFlightData[]
): Avia.AircraftData[] =>
  myFlights.map((myFlight: MyFlightData) => {
    const { attributes, id } = myFlight;
    const {
      registration,
      cn,
      airline,
      model,
      manufacturer,
      firstFlight,
      airplaneName,
      photoUrl,
    } = attributes;

    return {
      id,
      attributes: {
        registration: registration ?? '',
        serial: cn,
        airlineName: airline,
        modelCode: model,
        model,
        typeName: manufacturer,
        productionLine: manufacturer,
        isFreighter: false,
        firstFlightDate: firstFlight,
        rolloutDate: firstFlight,
        deliveryDate: firstFlight,
        photoUrl,
        airplaneName,
        source: 'myFlights',
      },
    };
  });
