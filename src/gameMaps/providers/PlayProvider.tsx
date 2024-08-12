import { ReactNode } from 'react';

import { PlayPageData } from '@/gameMaps/types';

import PlayContext from '@/gameMaps/contexts/PlayContext';

import usePlayProvider from '@/gameMaps/providers/hooks/usePlayProvider';

const PlayProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: PlayPageData | null;
}) => {
  const data = usePlayProvider(apiData);

  return <PlayContext.Provider value={data}>{children}</PlayContext.Provider>;
};

export default PlayProvider;
