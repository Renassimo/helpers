import { useContext } from 'react';

import PlayContext from '@/gameMaps/contexts/PlayContext';

const usePlayContext = () => useContext(PlayContext);

export default usePlayContext;
