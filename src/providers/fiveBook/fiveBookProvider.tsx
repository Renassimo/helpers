import { ReactNode, useEffect, useState } from 'react';

import FiveBookContext from '@/contexts/fiveBook';

import { FiveBookData } from '@/types/fiveBook';

import useFiveBookData from '@/providers/fiveBook/hooks/useFiveBookData';

const FiveBookProvider = ({
  children,
  data: apiData,
}: {
  children: ReactNode;
  data: FiveBookData;
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
