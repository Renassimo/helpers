import { useContext } from 'react';

import PlayContext from '@/gameMaps/contexts/PlayContext';

const usePlay = () => useContext(PlayContext);

export default usePlay;
