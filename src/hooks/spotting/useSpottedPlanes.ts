import { useContext } from 'react';

import SpottingContext from '@/contexts/spotting';

const useSpottedPlanes = () => useContext(SpottingContext);

export default useSpottedPlanes;
