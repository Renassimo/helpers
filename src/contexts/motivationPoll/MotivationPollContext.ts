import { createContext } from 'react';

import {
  MotivationPollContextData,
  MotivationPollDefaultContextData,
} from '@/types/motivationPoll';

const MotivationPollContext = createContext<MotivationPollContextData>(
  MotivationPollDefaultContextData
);

export default MotivationPollContext;
