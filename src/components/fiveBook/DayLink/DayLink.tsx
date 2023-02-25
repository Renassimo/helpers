import Link from 'next/link';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import useFiveBook from '@/hooks/fiveBook/useFiveBook';

const DayLink = ({ prev = false, next = false }) => {
  const { prevFiveBookDayCode, nextFiveBookDayCode } = useFiveBook();

  return (
    <>
      {prev && (
        <Link href={`/5book/${prevFiveBookDayCode}`}>
          <ArrowBackIosNewIcon />
        </Link>
      )}
      {next && (
        <Link href={`/5book/${nextFiveBookDayCode}`}>
          <ArrowForwardIosIcon />
        </Link>
      )}
    </>
  );
};

export default DayLink;
