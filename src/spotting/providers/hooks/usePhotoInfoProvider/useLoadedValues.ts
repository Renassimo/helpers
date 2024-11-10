import { useMemo } from 'react';

import { PhotoFolderInfoAttributes } from '@/spotting/types';
import { Avia } from '@/avia/types/avia';

import { showTimePassed } from '@/common/utils/dayjs';

const useLoadedValues = ({
  aircraftsResult,
  place,
  date,
}: {
  aircraftsResult: Avia.AircraftsResult;
  place: string | null;
  date: string | null;
}): {
  loadedValues: Partial<PhotoFolderInfoAttributes>;
} => {
  // Aircrafs
  const { chosenAircraft } = aircraftsResult;

  const loadedValues: Partial<PhotoFolderInfoAttributes> = useMemo(() => {
    const registration = chosenAircraft?.attributes.registration ?? null;

    const firstFlight =
      chosenAircraft?.attributes.firstFlightDate ??
      chosenAircraft?.attributes.rolloutDate ??
      chosenAircraft?.attributes.deliveryDate ??
      null;

    return {
      title: null,
      date,
      place,
      photosUrl: null,
      extraLink: null,
      planespottersUrl: registration
        ? `https://www.planespotters.net/search?q=${registration}`
        : null,
      registration,
      carrier: chosenAircraft?.attributes.airlineName ?? null,
      manufacturer:
        chosenAircraft?.attributes.typeName ??
        chosenAircraft?.attributes.productionLine ??
        null,
      model:
        chosenAircraft?.attributes.modelCode ??
        chosenAircraft?.attributes.model ??
        null,
      firstFlight,
      cn: chosenAircraft?.attributes.serial ?? null,
      airplaneName: chosenAircraft?.attributes.airplaneName ?? null,
      flown: null,
      modelled: null,
      infoReady: null,
      readyToPublish: null,
      rating: null,
      age: firstFlight && date ? showTimePassed(firstFlight, date) : null,
      url: null,
    };
  }, [chosenAircraft, place, date]);

  return { loadedValues };
};

export default useLoadedValues;
