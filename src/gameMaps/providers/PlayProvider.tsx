import { ReactNode } from 'react';

import { PlayPageData } from '@/gameMaps/types';

import PlayContext from '@/gameMaps/contexts/PlayContext';

import usePlayData from '@/gameMaps/providers/hooks/usePlayData';

const PlayProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: PlayPageData | null;
}) => {
  const data = usePlayData(apiData);

  return <PlayContext.Provider value={data}>{children}</PlayContext.Provider>;
};

export default PlayProvider;
