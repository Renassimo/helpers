import { useContext } from 'react';

import FiveBookContext from '@/fiveBook/contexts/FiveBookContext';

const useFiveBook = () => useContext(FiveBookContext);

export default useFiveBook;
