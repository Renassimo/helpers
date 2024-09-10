import { Dispatch, SetStateAction, useState } from 'react';

const useStateValue = <T>(defaultValue: T): [T, Dispatch<SetStateAction<T>>] =>
  useState<T>(defaultValue);

export default useStateValue;
