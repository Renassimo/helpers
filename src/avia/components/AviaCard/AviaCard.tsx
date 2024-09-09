import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import ActiveCard from '@/common/components/ActiveCard';

const AviaCard = ({
  additionalContent,
  onClick,
  chosen = false,
  imageUrl,
  imageAlt,
  title,
  link,
}: {
  additionalContent: (string | null)[];
  onClick: () => void;
  chosen?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  link?: string;
}) => {
  return (
    <ActiveCard
      onClick={onClick}
      onClose={onClick}
      chosen={chosen}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      link={link}
    >
      {title && (
        <Typography gutterBottom variant="body2">
          {title}{' '}
          {link && (
            <IconButton
              href={link}
              target="_blank"
              size="small"
              onClick={(event) => event.stopPropagation()}
            >
              <OpenInNewIcon />
            </IconButton>
          )}
        </Typography>
      )}
      {additionalContent.map(
        (item, index) =>
          item && (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
              key={item + index}
            >
              {item}
            </Typography>
          )
      )}
    </ActiveCard>
  );
};

export default AviaCard;
