import { useContext } from 'react';

import MotivationPollContext from '@/motivationPoll/contexts/MotivationPollContext';

const useMotivationPoll = () => useContext(MotivationPollContext);

export default useMotivationPoll;
