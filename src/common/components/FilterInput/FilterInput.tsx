import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CloseIcon from '@mui/icons-material/Close';

const FilterInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <FormControl>
      <Input
        id="filter"
        size="small"
        placeholder="Filter"
        aria-label="Filter"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            {value && (
              <IconButton
                aria-label="Clear filter"
                onClick={() => setValue('')}
                edge="end"
              >
                {<CloseIcon />}
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default FilterInput;
