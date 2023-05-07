import React, { ChangeEvent } from 'react';

import { SpottedPlaneProviderData } from '@/types/spotting';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import TextField from '@mui/material/TextField';

const SpottedPlaneForm = ({ data }: { data: SpottedPlaneProviderData }) => {
  const { id, description, hashtags } = data;
  const { updateDescription, updateHashtags } = useSpottedPlanes();

  const descriptionInputName = `description-${id}`;
  const hashtagsInputName = `hashtags-${id}`;

  const onDescriptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateDescription(id, event.target.value);
  };
  const onHashtagsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateHashtags(id, event.target.value);
  };

  return (
    <form>
      <TextField
        id={descriptionInputName}
        name={descriptionInputName}
        value={description}
        onChange={onDescriptionChange}
        multiline
        fullWidth
        margin="dense"
        variant="standard"
      />
      <TextField
        id={hashtagsInputName}
        name={hashtagsInputName}
        value={hashtags}
        onChange={onHashtagsChange}
        multiline
        fullWidth
        margin="dense"
        variant="standard"
      />
    </form>
  );
};

export default SpottedPlaneForm;
