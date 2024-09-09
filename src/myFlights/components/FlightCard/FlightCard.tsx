import { Avia } from '@/avia/types/avia';

import AviaCard from '@/avia/components/AviaCard';

const FlightCard = ({
  data,
  onClick,
  chosen = false,
}: {
  data: Avia.FlightData;
  onClick: () => void;
  chosen?: boolean;
}) => {
  const { attributes } = data;
  const {
    registration,
    distance,
    airline,
    aircraft,
    origin,
    destination,
    originName,
    destinationName,
    photoUrl,
    flightNumber,
  } = attributes;

  const withRoute = origin || destination;
  const withNamedRoute = originName || destinationName;

  const additionalContent = [
    withNamedRoute && `${originName} - ${destinationName}`,
    withRoute && `${origin} - ${destination}`,
    airline,
    aircraft,
    registration,
    distance ? `${distance} km` : null,
  ];

  const link =
    flightNumber && `https://www.google.com/search?q=${flightNumber}`;

  return (
    <AviaCard
      onClick={onClick}
      chosen={chosen}
      imageUrl={photoUrl ?? '/images/plane.png'}
      imageAlt={flightNumber}
      link={link}
      title={flightNumber}
      additionalContent={additionalContent}
    />
  );
};

export default FlightCard;
