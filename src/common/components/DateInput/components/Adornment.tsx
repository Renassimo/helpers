import { ReactNode } from 'react';

import { Dayjs } from 'dayjs';

import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import TodayIcon from '@mui/icons-material/Today';
import DoneIcon from '@mui/icons-material/Done';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export interface AdornmentProps {
  label?: string;
  onClick?: () => void;
  dayValue?: Dayjs;
  onChange?: (dayValue: Dayjs | null) => void;
  disabled?: boolean;
}

const icons: Record<string, ReactNode> = {
  'Change date': <DoneIcon />,
  Refresh: <RestartAltIcon />,
  'Paste date': <ContentPasteIcon />,
  'Prev day': <NavigateBeforeIcon />,
  Today: <TodayIcon />,
  'Next day': <NavigateNextIcon />,
  'Clear date': <CloseIcon />,
};

const Adornment = ({ label, onClick, disabled = false }: AdornmentProps) => {
  const icon = label ? icons[label] : null;

  return (
    <IconButton
      aria-label={label}
      onClick={onClick}
      edge="end"
      disabled={disabled}
    >
      {icon}
    </IconButton>
  );
};

export default Adornment;
