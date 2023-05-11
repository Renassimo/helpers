import React from 'react';

import { SpottedPlaneProviderData } from '@/types/spotting';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CollectionsIcon from '@mui/icons-material/Collections';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';
import useApplySpottedPlanes from '@/hooks/spotting/useApplySpottedPlanes';

import SelectableCard from '@/components/spotting/SelectableCard';
import NewFirstFlightForm from '@/components/spotting/NewFirstFlightForm';
import SpottedPlaneForm from '@/components/spotting/SpottedPlaneForm';

const SpottedPlaneCard = ({
  data,
  selectable = false,
}: {
  data: SpottedPlaneProviderData;
  selectable?: boolean;
}) => {
  const {
    id,
    name,
    photoUrl,
    planespottersUrl,
    description,
    hashtags,
    firstFlight,
    photosUrl,
    url,
  } = data;

  const { update, loading } = useApplySpottedPlanes();

  const {
    selectedIds,
    addSelectedId,
    removeSelectedIds,
    generateDescription,
    generateHashtags,
    clearHashtags,
    clearDescription,
  } = useSpottedPlanes();
  const isAnySelected = selectedIds.length > 0;
  const isSelected = selectedIds.includes(id);

  const toggleSelect = () => {
    if (isSelected) {
      removeSelectedIds([id]);
    } else {
      addSelectedId(id);
    }
  };

  const isPhotoSelectable = selectable && isAnySelected;

  const onPhotoClick = () => {
    if (isPhotoSelectable) toggleSelect();
  };

  const createDescription = () => {
    generateDescription(id);
    generateHashtags(id);
  };

  const apply = async () => {
    await update([data]);
  };

  const discard = () => {
    clearDescription(id);
    clearHashtags(id);
  };

  const showDescription = !!(description || hashtags);

  return (
    <SelectableCard
      isAnySelected={isAnySelected}
      selectable={selectable}
      selected={isSelected}
      toggleSelect={toggleSelect}
    >
      {
        <CardMedia
          image={photoUrl ?? '/images/plane.png'}
          title={name ?? id}
          sx={{ height: 140, cursor: isPhotoSelectable ? 'pointer' : '' }}
          onClick={onPhotoClick}
        />
      }
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {name}
          <IconButton size="small" href={url} target="_blank" rel="noreferrer">
            <ContentPasteIcon fontSize="small" />
          </IconButton>
          {photosUrl && (
            <IconButton
              size="small"
              href={photosUrl}
              target="_blank"
              rel="noreferrer"
            >
              <CollectionsIcon fontSize="small" />
            </IconButton>
          )}
          {planespottersUrl && (
            <IconButton
              size="small"
              href={planespottersUrl}
              target="_blank"
              rel="noreferrer"
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          )}
        </Typography>
        {!firstFlight && (
          <NewFirstFlightForm id={data.id} disabled={showDescription} />
        )}
        {showDescription && <SpottedPlaneForm data={data} />}
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        {showDescription ? (
          <>
            <Button size="small" onClick={discard} disabled={loading}>
              Discard
            </Button>
            {selectable && (
              <LoadingButton size="small" onClick={apply} loading={loading}>
                Apply
              </LoadingButton>
            )}
          </>
        ) : (
          <Button size="small" onClick={createDescription}>
            Create description
          </Button>
        )}
      </CardActions>
    </SelectableCard>
  );
};

export default SpottedPlaneCard;
