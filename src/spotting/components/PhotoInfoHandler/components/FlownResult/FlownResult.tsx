import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Avia } from '@/avia/types/avia';

import { showReadableDate } from '@/common/utils/dayjs';

import AviaCard from '@/avia/components/AviaCard';

import useFlownData from '@/spotting/hooks/useFlownData';

const FlownResult = ({
  aircraftsResult,
  onClick,
}: {
  aircraftsResult: Avia.AircraftsResult;
  onClick: () => void;
}) => {
  const { loading: flownLoading, data: flownData } =
    useFlownData(aircraftsResult);

  if (flownLoading) {
    return <Typography variant="body1">Searching flown data...</Typography>;
  }
  if (flownData && flownData?.data.length > 0) {
    return (
      <Box>
        <Typography variant="body1">
          Maybe already flown on that plane:
        </Typography>
        <Box display="flex" overflow="scroll" gap={2}>
          {flownData.data.map(({ id, attributes }) => (
            <AviaCard
              onClick={onClick}
              key={id}
              imageUrl={attributes.photoUrl ?? '/images/plane.png'}
              imageAlt={attributes.registration ?? 'Flight'}
              link={attributes.url}
              title={attributes.registration ?? 'Flight'}
              additionalContent={[
                attributes.airline,
                `${attributes.originName} - ${attributes.destinationName}`,
                attributes.date && showReadableDate(dayjs(attributes.date)),
              ]}
            />
          ))}
        </Box>
      </Box>
    );
  }
  return null;
};

export default FlownResult;
