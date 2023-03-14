import { useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import Modal from '@/components/common/Modal';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';
import useUpdateAnswers from '@/hooks/fiveBook/useUpdateAnswers';

const UpdateAnswer = () => {
  const { answers, question } = useFiveBook();
  const { update, loading } = useUpdateAnswers(false);

  const { query, replace } = useRouter();
  const { updateYear } = query;

  const year = useMemo(
    () => (typeof updateYear == 'string' ? updateYear : null),
    [updateYear]
  );

  const answer = useMemo(
    () => answers?.find((answer) => answer.year === year)?.value ?? '',
    [answers, year]
  );

  const modalTitle = useMemo(
    () => (year ? `Update ${year} answer` : ''),
    [year]
  );

  const isModalOpen = useMemo(
    () => !!(year && answers?.find((answer) => answer.year === year)),
    [answers, year]
  );

  const handleModalClose = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { updateYear, ...updatedQuery } = query;
    await replace({ pathname: '', query: updatedQuery }, undefined, {
      shallow: true,
    });
  }, [query, replace]);

  const updateAnswerRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback(async () => {
    // @ts-ignore
    await update({ [String(year)]: updateAnswerRef?.current?.value });
    await handleModalClose();
  }, [handleModalClose, update, year]);

  return (
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
        id="updateAnswer"
        label="Update"
        inputRef={updateAnswerRef}
        multiline
        rows={4}
        fullWidth
        margin="dense"
        defaultValue={answer}
        autoFocus
        name="updateAnswer"
      />
    </Modal>
  );
};

export default UpdateAnswer;
