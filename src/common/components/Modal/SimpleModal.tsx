import { ReactNode } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Breakpoint } from '@mui/material';

const SimpleModal = ({
  open,
  children,
  onClose,
  onSubmit,
  title,
  loading,
  disabled = false,
  maxWidth = 'sm',
}: {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  loading: boolean;
  disabled?: boolean;
  maxWidth?: Breakpoint;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-modal"
      maxWidth={maxWidth}
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
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          disabled={disabled}
          type="button"
          onClick={() => onSubmit()}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleModal;
