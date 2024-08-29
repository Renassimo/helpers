import { showTimePassed, showWhen } from '@/common/utils/dayjs';

import { Avia } from '@/avia/types/avia';

import AviaCard from '@/avia/components/AviaCard';

const AircraftCard = ({
  data,
  onClick,
  chosen = false,
}: {
  data: Avia.AircraftData;
  onClick: () => void;
  chosen?: boolean;
}) => {
  const { attributes } = data;
  const {
    registration,
    serial,
    airlineName,
    typeName,
    productionLine,
    modelCode,
    model,
    photoUrl,
    firstFlightDate,
    rolloutDate,
    deliveryDate,
  } = attributes;

  const date = firstFlightDate ?? rolloutDate ?? deliveryDate;

  const additionalContent: (string | null)[] = [
    airlineName,
    typeName || productionLine,
    modelCode || model,
    serial && `CN: ${serial}`,
    date && `From ${showWhen(date, false)} (${showTimePassed(date)})`,
  ];

  return (
    <AviaCard
      onClick={onClick}
      chosen={chosen}
      imageUrl={photoUrl ?? '/images/plane.png'}
      imageAlt={registration}
      title={registration}
      additionalContent={additionalContent}
    />
  );
};

export default AircraftCard;
