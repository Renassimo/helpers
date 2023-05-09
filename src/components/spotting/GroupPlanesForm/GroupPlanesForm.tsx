import React, { ChangeEvent } from 'react';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const GroupPlanesForm = () => {
  const {
    groupDescription,
    groupHashtags,
    groupName,
    setGroupDescription,
    setGroupHashtags,
    setGroupName,
  } = useSpottedPlanes();

  const descriptionInputName = `group-description`;
  const hashtagsInputName = `group-hashtags`;
  const groupNameInputName = `group-name`;

  const onDescriptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGroupDescription(event.target.value);
  };
  const onHashtagsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGroupHashtags(event.target.value);
  };
  const onGroupNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGroupName(event.target.value);
  };

  return (
    <>
      <TextField
        id={descriptionInputName}
        name={descriptionInputName}
        value={groupDescription}
        onChange={onDescriptionChange}
        multiline
        fullWidth
        margin="dense"
        variant="standard"
        placeholder="Description"
      />
      <Typography variant="caption">
        Hashtags: {groupDescription.split('#').length - 1}
      </Typography>
      <TextField
        id={hashtagsInputName}
        name={hashtagsInputName}
        value={groupHashtags}
        onChange={onHashtagsChange}
        multiline
        fullWidth
        margin="dense"
        variant="standard"
        placeholder="Hashtags"
      />
      <Typography variant="caption">
        Hashtags: {groupHashtags.split('#').length - 1}
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <TextField
          id={groupNameInputName}
          name={groupNameInputName}
          value={groupName}
          onChange={onGroupNameChange}
          margin="dense"
          variant="standard"
          placeholder="Group name"
        />
      </Box>
    </>
  );
};

export default GroupPlanesForm;
