import Typography from '@mui/material/Typography';

import ActiveCard from '@/common/components/ActiveCard';

const AviaCard = ({
  additionalContent,
  onClick,
  chosen = false,
  imageUrl,
  imageAlt,
  title,
}: {
  additionalContent: (string | null)[];
  onClick: () => void;
  chosen?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
}) => {
  return (
    <ActiveCard
      onClick={onClick}
      onClose={onClick}
      chosen={chosen}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
    >
      {title && (
        <Typography gutterBottom variant="body2">
          {title}
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
