import Link from 'next/link';
import styled from '@emotion/styled';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';

import useFiveBook from '@/fiveBook/hooks/useFiveBook';

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const DayLink = ({ prev = false, next = false }) => {
  const { prevFiveBookDayCode, nextFiveBookDayCode } = useFiveBook();

  return (
    <>
      {prev && (
        <StyledLink href={`/5book/${prevFiveBookDayCode}`} passHref>
          <Button>
            <ArrowBackIosNewIcon />
          </Button>
        </StyledLink>
      )}
      {next && (
        <StyledLink href={`/5book/${nextFiveBookDayCode}`} passHref>
          <Button>
            <ArrowForwardIosIcon />
          </Button>
        </StyledLink>
      )}
    </>
  );
};

export default DayLink;
