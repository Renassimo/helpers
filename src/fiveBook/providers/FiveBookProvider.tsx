import { ReactNode, useEffect, useState } from 'react';

import FiveBookContext from '@/fiveBook/contexts/FiveBookContext';

import { FiveBookData } from '@/types/fiveBook';

import useFiveBookData from '@/fiveBook/providers/hooks/useFiveBookData';

const FiveBookProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: FiveBookData | null;
}) => {
  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  const dayData = useFiveBookData(data);

  const value = {
    setData,
    ...dayData,
  };

  return (
    <FiveBookContext.Provider value={value}>
      {children}
    </FiveBookContext.Provider>
  );
};

export default FiveBookProvider;
