import { Avia } from '@/avia/types/avia';

import useChooseRetreivedItem from '@/common/hooks/useChooseRetreivedItem';

const useAircrafts = (): Avia.AircraftsResult => {
  const {
    items: aircrafts,
    chosenItem: chosenAircraft,
    retreiveItems,
    chooseItem: chooseAircraft,
    clearChosenItem: clearChosenAircraft,
    loading,
    cleanUp: cleanUpAircrafts,
  } = useChooseRetreivedItem<Avia.AircraftData>();

  // /api/avia/aircrafts/SP-TVZ
  const retreiveAircrafts = async (registration: string) =>
    await retreiveItems(`/api/avia/aircrafts/${registration}`);

  return {
    aircrafts,
    chosenAircraft,
    retreiveAircrafts,
    chooseAircraft,
    clearChosenAircraft,
    loading,
    cleanUpAircrafts,
  };
};

export default useAircrafts;
