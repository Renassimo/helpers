import { Avia } from '@/avia/types/avia';

import AviaCard from '@/avia/components/AviaCard';

const AirportCard = ({
  data,
  onClick,
  chosen = false,
  title,
}: {
  data: Avia.AirportData;
  onClick: () => void;
  chosen?: boolean;
  title?: string;
}) => {
  const { attributes } = data;
  const { airportCode, airportName, municipalityName, shortName } = attributes;

  const withName =
    airportName ||
    `${municipalityName}${(municipalityName || shortName) && ' '}${shortName}`;

  const displayTitle = title ?? (airportCode || withName);

  const additionalContent = [
    title ? airportCode : null,
    displayTitle !== withName ? withName : null,
  ];

  return (
    <AviaCard
      onClick={onClick}
      chosen={chosen}
      title={displayTitle}
      additionalContent={additionalContent}
    />
  );
};

export default AirportCard;
