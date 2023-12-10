import { ReactNode } from 'react';

import useMotivationPollData from '@/providers/motivationPoll/hooks/useMotivationPollData';

import MotivationPollContext from '@/contexts/motivationPoll';

import { MotivationPollApiData } from '@/types/motivationPoll';

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
