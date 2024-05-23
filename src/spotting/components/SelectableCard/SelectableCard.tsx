import React, { ReactNode } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SelectedIcon = () => <CheckCircleIcon color="primary" />;

const UnselectedIcon = ({
  isAnySelected = false,
}: {
  isAnySelected?: boolean;
}) => (isAnySelected ? <RadioButtonUncheckedIcon /> : <CheckCircleIcon />);

const SelectIconButton = ({
  isAnySelected = false,
  selected = false,
  onClick,
}: {
  isAnySelected?: boolean;
  selected?: boolean;
  onClick: () => void;
}) => (
  <IconButton onClick={onClick}>
    {selected ? (
      <SelectedIcon />
    ) : (
      <UnselectedIcon isAnySelected={isAnySelected} />
    )}
  </IconButton>
);

const CardChecker = ({
  isAnySelected = false,
  selected = false,
  toggleSelect,
}: {
  isAnySelected?: boolean;
  selected?: boolean;
  toggleSelect: () => void;
}) => {
  const isInvisible = !isAnySelected && !selected;
  return (
    <Box
      sx={{
        position: 'absolute',
        right: '0',
        opacity: isInvisible ? '0' : '1',
        transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      }}
      className="group-check-button-box"
    >
      <SelectIconButton
        isAnySelected={isAnySelected}
        selected={selected}
        onClick={toggleSelect}
      />
    </Box>
  );
};

const SelectableCard = ({
  children,
  selectable = false,
  selected = false,
  isAnySelected = false,
  toggleSelect,
}: {
  children: ReactNode;
  selectable?: boolean;
  selected?: boolean;
  isAnySelected?: boolean;
  toggleSelect: () => void;
}) => {
  const isSelected = selectable && selected;
  return (
    <Card
      sx={{
        position: 'relative',
        boxShadow: isSelected ? '0px 0px 2px 2px #1976d2' : 'none',
        '&:hover': {
          '& .group-check-button-box': { opacity: '1' },
        },
      }}
    >
      {selectable && (
        <CardChecker
          isAnySelected={isAnySelected}
          selected={isSelected}
          toggleSelect={toggleSelect}
        />
      )}
      {children}
    </Card>
  );
};

export default SelectableCard;
