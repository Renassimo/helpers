import { useCallback } from 'react';
import Head from 'next/head';

import { FiveBookData } from '@/types/fiveBook';
import { NotionError } from '@/types/notion';

const FiveBookPage = ({
  data,
  error,
}: {
  data: FiveBookData;
  error: NotionError;
}) => {
  const update = useCallback(async () => {
    const response = await fetch(
      `/api/5book/${data?.attributes?.dayCode?.value}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
  }, [data]);

  console.log({ data, error });

  return (
    <>
      <Head>
        <title>5book - helpers</title>
      </Head>
      <main>
        {data && (
          <>
            <h1>{data?.attributes?.question?.value}</h1>
            <ul>
              {Object.entries(data?.attributes?.answers).map(
                ([year, answer]) => (
                  <li key={answer.id}>
                    {year} - {answer.value}
                  </li>
                )
              )}
            </ul>
            <button type="button" onClick={update}>
              Emulate update
            </button>
          </>
        )}
        {error && <h3>Error: {error.message}</h3>}
      </main>
    </>
  );
};

export default FiveBookPage;
