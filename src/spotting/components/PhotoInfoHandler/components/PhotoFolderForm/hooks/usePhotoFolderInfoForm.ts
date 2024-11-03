import { useCallback, useEffect, useMemo, useState } from 'react';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';
import useLoadedValues from '@/spotting/providers/hooks/usePhotoInfoProvider/useLoadedValues';

import { Avia } from '@/avia/types/avia';

const usePhotoFolderInfoForm = ({
  aircraftsResult,
  airportsResult,
}: {
  aircraftsResult: Avia.AircraftsResult;
  airportsResult: Avia.AirportsResult;
}) => {
  const { chosenAirport } = airportsResult;

  const { place: placeCommon, showingFolder } = usePhotoInfoContext();

  const [place, setPlace] = useState(placeCommon);

  const date = useMemo(
    () =>
      Object.values(showingFolder?.photos ?? {}).find((photo) => photo.date)
        ?.date || null,
    [showingFolder?.photos]
  );

  const { loadedValues } = useLoadedValues({ aircraftsResult, place, date });

  const [modifiedLoadedValue, setModifiedLoadedValue] = useState(
    loadedValues ?? {}
  );

  const setFlown = useCallback(
    () =>
      setModifiedLoadedValue((current) => ({
        ...current,
        flown: true,
      })),
    []
  );

  useEffect(() => {
    if (chosenAirport) setPlace(chosenAirport.attributes.airportCode);
  }, [chosenAirport]);

  useEffect(() => {
    setModifiedLoadedValue(loadedValues);
  }, [loadedValues]);

  return {
    loadedValues: modifiedLoadedValue,
    setFlown,
    placeCommon,
  };
};

export default usePhotoFolderInfoForm;
