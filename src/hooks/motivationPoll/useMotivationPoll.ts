import { useContext } from 'react';

import MotivationPollContext from 'src/contexts/motivationPoll';

const useMotivationPoll = () => useContext(MotivationPollContext);

export default useMotivationPoll;
