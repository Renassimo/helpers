import { ReactNode } from 'react';

import useMotivationPollData from '@/motivationPoll/providers/hooks/useMotivationPollData';

import MotivationPollContext from '@/motivationPoll/contexts/MotivationPollContext';

import { MotivationPollApiData } from '@/motivationPoll/types';

const MotivationPollProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: MotivationPollApiData;
}) => {
  const motivationTestData = useMotivationPollData(apiData);

  return (
    <MotivationPollContext.Provider value={motivationTestData}>
      {children}
    </MotivationPollContext.Provider>
  );
};

export default MotivationPollProvider;
