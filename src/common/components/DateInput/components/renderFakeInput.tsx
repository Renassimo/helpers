import { useRef } from 'react';

import styled from '@emotion/styled';

import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TextFieldProps } from '@mui/material/TextField';

const EndAdornmentWrapper = styled.div`
  & div {
    margin: 0;
    & button {
      margin: 0;
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

type TextFieldPropsWithDisabled = TextFieldProps & {
  disabled?: boolean;
};

const FakeInput = (params: TextFieldPropsWithDisabled) => {
  const endAdornmentContainerRef = useRef(null);

  const onDateClick = () => {
    // @ts-ignore
    const child1 = endAdornmentContainerRef?.current?.children[0];
    const child2 = child1?.children[0];
    child2?.click();
    child1?.click();
  };
  return (
    <>
      <div style={{ display: 'none' }} ref={endAdornmentContainerRef}>
        {params.InputProps?.endAdornment}
        <input {...params.inputProps} />
      </div>
      <EndAdornmentWrapper ref={params.inputRef}>
        <IconButton
          onClick={onDateClick}
          edge="end"
          aria-label="Date Picker"
          disabled={params.disabled}
        >
          <CalendarMonthIcon />
        </IconButton>
      </EndAdornmentWrapper>
    </>
  );
};

const renderFakeInput = (params: TextFieldProps, disabled: boolean) => (
  <FakeInput {...params} disabled={disabled} />
);

export default renderFakeInput;
