import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';
import { Avia } from '@/avia/types/avia';

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
      },
    });
  });

  return data;
};
