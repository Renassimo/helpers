import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import FiveBookCard from '@/components/fiveBook/FiveBookCard';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';

const AnswersCard = () => {
  const { answers, question } = useFiveBook();
  return (
    <FiveBookCard>
      <Typography component="h2" variant="h6" textAlign="center" m={2}>
        {question}
      </Typography>
      <List sx={{ maxHeight: '85vh', overflow: 'auto' }}>
        {answers.map(
          ({ year, value }) =>
            value && (
              <ListItem key={year} dense>
                <ListItemText secondary={value}>{year}</ListItemText>
              </ListItem>
            )
        )}
      </List>
    </FiveBookCard>
  );
};

export default AnswersCard;
