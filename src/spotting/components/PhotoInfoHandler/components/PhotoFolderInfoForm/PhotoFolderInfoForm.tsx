import { useCallback, useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Avia } from '@/avia/types/avia';
import { PhotoActionType, PhotoFolderInfoAttributes } from '@/spotting/types';

import AviaFormField from '@/avia/components/AviaFormField';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import getFormFieldsSchema from './utils/getFormFieldsSchema';

const FormField = AviaFormField<PhotoFolderInfoAttributes>;

const excludedFields = ['manufacturer', 'model', 'carrier', 'place'];

const getNonNullable = <T extends Record<string, any>>(obj: T) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (excludedFields.includes(key) || value == null) return acc;
    return { ...acc, [key]: value };
  }, {} as T);

const PhotoFolderInfoForm = ({
  loadedValues = {},
}: {
  loadedValues: Partial<PhotoFolderInfoAttributes>;
}) => {
  const { options, matchers, dispatch, showingFolder } = usePhotoInfoContext();
  const { attributes = {} } = showingFolder || {};

  const [formState, setFormState] =
    useState<Partial<PhotoFolderInfoAttributes>>(attributes);

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      ...getNonNullable(loadedValues),
    }));
  }, [loadedValues]);

  const setFormValue = useCallback(
    (key: string, value: string | number | boolean | null) => {
      setFormState((current) => ({ ...current, [key]: value }));
    },
    []
  );

  const formFields: Avia.FormFieldProps<PhotoFolderInfoAttributes>[] = useMemo(
    () => getFormFieldsSchema(matchers, options),
    [matchers, options]
  );

  const onSave = () => {
    dispatch({
      type: PhotoActionType.SAVE_FOLDER_INFO,
      payload: formState,
    });
  };

  return (
    <Box>
      {formFields.map((field) => (
        <Box key={field.name} mt={1}>
          <FormField
            {...field}
            state={formState}
            setValue={setFormValue}
            loadedValues={loadedValues}
          />
        </Box>
      ))}
      <Box mt={2} display="flex" justifyContent="right">
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default PhotoFolderInfoForm;
