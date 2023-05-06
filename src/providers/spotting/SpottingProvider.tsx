import { ReactNode } from 'react';

import { SpottedPlaneApiData } from '@/types/spotting';

import SpottingContext from '@/contexts/spotting';

import useSpottingData from '@/providers/spotting/hooks/useSpottingData';

const SpottingProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: SpottedPlaneApiData[] | null;
}) => {
  const spottingData = useSpottingData(apiData);

  return (
    <SpottingContext.Provider value={spottingData}>
      {children}
    </SpottingContext.Provider>
  );
};

export default SpottingProvider;
