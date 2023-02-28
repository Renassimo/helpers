import { useState, MouseEvent, useCallback, ChangeEvent } from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import { TextField } from '@mui/material';

import Modal from '@/components/common/Modal';
import FiveBookCard from '@/components/fiveBook/FiveBookCard';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';
import useUpdateAnswers from '@/hooks/fiveBook/useUpdateAnswers';

const AnswersCard = () => {
  const { answers, question } = useFiveBook();
  const { update, loading } = useUpdateAnswers(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [year, setYear] = useState('');
  const [answer, setAnswer] = useState('');

  const modalTitle = `Update ${year} answer`;

  const handleModalOpen = useCallback(
    (event: MouseEvent<HTMLElement>, year: string) => {
      event.preventDefault();
      setYear(year);
      const answer =
        answers?.find((answer) => answer.year === year)?.value ?? '';
      setAnswer(answer);
      setIsModalOpen(true);
    },
    [answers, setYear, setAnswer, setIsModalOpen]
  );
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);
  const onSubmit = useCallback(async () => {
    await update({ [String(year)]: answer });
    setYear('');
    setAnswer('');
    handleModalClose();
  }, [answer, handleModalClose, update, year]);
  const onAnswerChanged = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setAnswer(event.target.value),
    [setAnswer]
  );

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
                <ListItemText secondary={value}>
                  <Link
                    href=""
                    onClick={(event) => handleModalOpen(event, year)}
                  >
                    {year}
                  </Link>
                </ListItemText>
              </ListItem>
            )
        )}
      </List>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        onSubmit={onSubmit}
        loading={loading}
      >
        <Typography component="h3" variant="h6">
          {question}
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          margin="dense"
          value={answer}
          autoFocus
          onChange={onAnswerChanged}
        />
      </Modal>
    </FiveBookCard>
  );
};

export default AnswersCard;
