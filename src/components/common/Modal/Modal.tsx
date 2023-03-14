import { FormEvent, ReactNode } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Modal = ({
  open,
  children,
  onClose,
  onSubmit,
  title,
  loading,
}: {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  title: string;
  loading: boolean;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-modal"
    >
      <DialogTitle id="responsive-modal">
        {title}
        {onClose && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} type="submit">
            Save
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Modal;
