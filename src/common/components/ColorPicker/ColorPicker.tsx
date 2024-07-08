import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { getInvertedBWColor, onColorPick } from '@/common/utils/colors';

const ColorPicker = ({
  name,
  value,
  label,
  onChange,
}: {
  name: string;
  value: string;
  label?: string;
  onChange: (color: string) => void;
}) => {
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
      />
      <Box
        sx={{
          position: 'absolute',
          right: '4px',
          bottom: '8px',
          height: '24px',
          width: '24px',
          borderRadius: '12px',
          backgroundColor: value,
          cursor: 'pointer',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: getInvertedBWColor(value),
        }}
        onClick={() => onColorPick(onChange)}
      />
    </Box>
  );
};

export default ColorPicker;
