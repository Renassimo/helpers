import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import SelectableCard from '@/spotting/components/SelectableCard';

const PhotoInfoCard = ({
  selected = false,
  name,
  preview,
  id,
  onPhotoSelected,
  onOpenZoom,
  onClick,
  onRemoveFromFolder,
  onDuplicate,
}: {
  selected?: boolean;
  name: string;
  preview: string;
  id: string;
  onPhotoSelected?: (id: string) => void;
  onOpenZoom?: (id: string) => void;
  onClick?: (id?: string) => void;
  onRemoveFromFolder?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}) => {
  const toggleSelect = () => onPhotoSelected?.(id);
  const handleClick = (onClick && (() => onClick(id))) || toggleSelect;

  return (
    <SelectableCard selectable selected={selected} toggleSelect={toggleSelect}>
      <Box position="relative">
        <CardMedia
          image={preview ?? '/images/plane.png'}
          title={name}
          sx={{
            height: 140,
            maxWidth: '100%',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        />
        <Box
          position="absolute"
          bottom={0}
          right={0}
          display="flex"
          flexDirection="column"
        >
          {onRemoveFromFolder && (
            <IconButton
              aria-label="remove"
              onClick={() => onRemoveFromFolder(id)}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
          {onDuplicate && (
            <IconButton aria-label="duplicate" onClick={() => onDuplicate(id)}>
              <ContentCopyIcon />
            </IconButton>
          )}
          {onOpenZoom && (
            <IconButton aria-label="zoom" onClick={() => onOpenZoom(id)}>
              <ZoomInIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </SelectableCard>
  );
};

export default PhotoInfoCard;
