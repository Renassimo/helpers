import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import ColorizeIcon from '@mui/icons-material/Colorize';

import SimpleModal from '@/common/components/Modal/SimpleModal';

import { getInvertedBWColor, onColorPick } from '@/common/utils/colors';

const ColorPicker = ({
  name,
  value,
  label,
  onChange,
  error,
}: {
  name: string;
  value: string;
  label?: string;
  onChange: (color: string) => void;
  error?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preValue, setPreValue] = useState(value);

  const handleColorize = () => {
    setIsModalOpen(false);
    onColorPick(onChange);
  };

  const onSubmit = () => {
    onChange(preValue);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) setPreValue(value);
  }, [value, isModalOpen]);

  return (
    <Box position="relative">
      <TextField
        name={name}
        label={label ?? name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        multiline
        margin="dense"
        variant="standard"
        error={!!error}
        helperText={error}
      />
      <Box
        sx={{
          position: 'absolute',
          right: '4px',
          top: '28px',
          height: '24px',
          width: '24px',
          borderRadius: '12px',
          backgroundColor: value,
          cursor: 'pointer',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: getInvertedBWColor(value),
        }}
        onClick={() => setIsModalOpen(true)}
      />
      <SimpleModal
        open={isModalOpen}
        loading={false}
        title="Pick a color"
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
      >
        <Box mb={-2}>
          <HexColorPicker color={preValue} onChange={setPreValue} />
          <Box mt={1} textAlign="center">
            <IconButton aria-label="colorize" onClick={handleColorize}>
              <ColorizeIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      </SimpleModal>
    </Box>
  );
};

export default ColorPicker;
