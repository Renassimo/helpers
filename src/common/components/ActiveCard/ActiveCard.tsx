import { ReactNode } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ActiveCard = ({
  children,
  onClick,
  onClose,
  chosen = false,
  imageUrl,
  imageAlt,
}: {
  children: ReactNode;
  onClick: () => void;
  onClose: () => void;
  chosen?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}) => {
  return (
    <Card sx={{ maxWidth: 250, minWidth: 200, position: 'relative', my: 1 }}>
      {chosen && (
        <IconButton
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      )}
      <CardActionArea
        onClick={!chosen ? onClick : undefined}
        disabled={chosen}
        aria-label="Action area"
      >
        {imageUrl && (
          <CardMedia
            component="img"
            height="120"
            image={imageUrl}
            alt={imageAlt ?? 'img'}
          />
        )}
        <CardContent>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActiveCard;
