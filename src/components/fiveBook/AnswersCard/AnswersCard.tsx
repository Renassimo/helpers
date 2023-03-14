import { MouseEvent, useCallback } from 'react';
import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

import FiveBookCard from '@/components/fiveBook/FiveBookCard';
import UpdateAnswer from '@/components/fiveBook/UpdateAnswer';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';

const AnswersCard = () => {
  const { answers, question } = useFiveBook();
  const { replace, query } = useRouter();

  const handleModalOpen = useCallback(
    async (event: MouseEvent<HTMLElement>, year: string) => {
      event.preventDefault();
      await replace(
        { pathname: '', query: { ...query, updateYear: year } },
        undefined,
        { shallow: true }
      );
    },
    [query, replace]
  );

  return (
    <>
      <FiveBookCard>
        <Typography component="h2" variant="h6" textAlign="center" m={2}>
          {question}
        </Typography>
        <List>
          {answers.map(
            ({ year, value }) =>
              value && (
                <ListItem key={year} dense>
                  <ListItemText secondary={value}>
                    <Link
                      href={`?updateYear=${year}`}
                      onClick={(event) => handleModalOpen(event, year)}
                    >
                      {year}
                    </Link>
                  </ListItemText>
                </ListItem>
              )
          )}
        </List>
      </FiveBookCard>
      <UpdateAnswer />
    </>
  );
};

export default AnswersCard;
