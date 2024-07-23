import Link from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { showWhen } from '@/common/utils/dayjs';

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
          {(createdAt || updatedAt) && (
            <Box mt={1}>
              {createdAt && (
                <Typography variant="body2">
                  <span>Started: </span>
                  <span>{showWhen(createdAt)}</span>
                </Typography>
              )}
              {updatedAt && (
                <Typography variant="body2">
                  <span>Last updated: </span>
                  <span>{showWhen(updatedAt)}</span>
                </Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default PlayCard;
