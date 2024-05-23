import { createContext } from 'react';

import {
  MotivationPollContextData,
  MotivationPollDefaultContextData,
} from '@/motivationPoll/types';

const MotivationPollContext = createContext<MotivationPollContextData>(
  MotivationPollDefaultContextData
);

export default MotivationPollContext;
