import { Dispatch, SetStateAction, useState } from 'react';

const useInputValue = <T>(defaultValue: T): [T, Dispatch<SetStateAction<T>>] =>
  useState<T>(defaultValue);

export default useInputValue;
