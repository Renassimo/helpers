import Link from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PlayCard = ({
  title,
  description,
  href,
  createdAt,
  updatedAt,
  onClick,
}: {
  title: string;
  description: string;
  href: string;
  createdAt?: string;
  updatedAt?: string;
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
          <Typography variant="body2">{createdAt}</Typography>
          <Typography variant="body2">{updatedAt}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PlayCard;
