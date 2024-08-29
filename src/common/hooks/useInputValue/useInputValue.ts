import { Dispatch, SetStateAction, useState } from 'react';

const useInputValue = (
  defaultValue = ''
): [string, Dispatch<SetStateAction<string>>] => useState(defaultValue);

export default useInputValue;
