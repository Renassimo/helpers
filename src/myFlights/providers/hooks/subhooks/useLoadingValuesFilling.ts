import { MyFlightAttributes } from '@/myFlights/types';
import { Dispatch, SetStateAction, useEffect } from 'react';

type PartialAttributes = Partial<MyFlightAttributes>;

const useLoadingValuesFilling = (
  loadedValues: PartialAttributes,
  setState: Dispatch<SetStateAction<PartialAttributes>>
): void => {
  useEffect(() => {
    setState((state) => ({
      ...state,
      originName: loadedValues.originName,
      distance: loadedValues.distance,
    }));
  }, [loadedValues.origin]);

  useEffect(() => {
    setState((state) => ({
      ...state,
      destinationName: loadedValues.destinationName,
      distance: loadedValues.distance,
    }));
  }, [loadedValues.destination]);

  useEffect(() => {
    setState((state) => {
      const aircraftExtraData =
        state.registration === loadedValues.registration
          ? {}
          : {
              registration: loadedValues.registration,
              cn: null,
              firstFlight: null,
              planespottersUrl: loadedValues.planespottersUrl,
              age: null,
              photoUrl: loadedValues.photoUrl,
            };
      return {
        ...state,
        date: loadedValues.date,
        flightNumber: loadedValues.flightNumber,
        originName: loadedValues.originName,
        destinationName: loadedValues.destinationName,
        distance: loadedValues.distance,
        ...aircraftExtraData,
      };
    });
  }, [loadedValues.flightNumber]);

  useEffect(() => {
    setState((state) => ({
      ...state,
      registration: loadedValues.registration,
      cn: loadedValues.cn,
      firstFlight: loadedValues.firstFlight,
      planespottersUrl: loadedValues.planespottersUrl,
      age: loadedValues.age,
      photoUrl: loadedValues.photoUrl,
    }));
  }, [loadedValues.cn]);
};

export default useLoadingValuesFilling;
