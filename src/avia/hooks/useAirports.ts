import { Avia } from '@/avia/types/avia';
import { RetrieveAirportsProps, UseAirportsResult } from '@/myFlights/types';

import useChooseRetreivedItem from '@/common/hooks/useChooseRetreivedItem';

const useAirports = (): UseAirportsResult => {
  const {
    items: airports,
    chosenItem: chosenAirport,
    retreiveItems,
    chooseItem: chooseAirport,
    clearChosenItem: clearChosenAirport,
    loading,
    cleanUp: cleanUpAirports,
  } = useChooseRetreivedItem<Avia.AirportData>();

  // /api/avia/airports?code=WAW
  // /api/avia/airports?code=UWKD
  // /api/avia/airports?lat=25.25&lon=55.36
  // /api/avia/airports?text=Istanbul
  const retreiveAirports = async ({
    code,
    text,
    lat,
    lon,
  }: RetrieveAirportsProps) => {
    let url = '';

    if (code) url = `/api/avia/airports?code=${code}`;
    else if (lat && lon) url = `/api/avia/airports?lat=${lat}&lon=${lon}`;
    else if (text) url = `/api/avia/airports?text=${text}`;

    return url ? await retreiveItems(url) : null;
  };

  return {
    airports,
    chosenAirport,
    retreiveAirports,
    chooseAirport,
    clearChosenAirport,
    loading,
    cleanUpAirports,
  };
};

export default useAirports;
