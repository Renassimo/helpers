import { useContext } from 'react';

import SpottingContext from '@/spotting/contexts/SpottingContext';

const useSpottedPlanes = () => useContext(SpottingContext);

export default useSpottedPlanes;
