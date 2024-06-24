import Link from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PlayCard = ({
  title,
  description,
  href,
  startDate,
  lastUpdateDate,
  onClick,
}: {
  title: string;
  description: string;
  href: string;
  startDate?: string;
  lastUpdateDate?: string;
  onClick?: () => void;
}) => {
  return (
    <Card variant="outlined">
      <Link
        href={href}
        onClick={(event) => {
          if (onClick) {
            event.preventDefault();
            onClick();
          }
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body2">{startDate}</Typography>
          <Typography variant="body2">{lastUpdateDate}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PlayCard;
