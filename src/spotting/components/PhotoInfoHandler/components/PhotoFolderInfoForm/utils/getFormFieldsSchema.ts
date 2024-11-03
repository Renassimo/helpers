import { Avia } from '@/avia/types/avia';
import { PhotoFolderInfoAttributes } from '@/spotting/types';

const getFormFieldsSchema = (
  matchers: Avia.Matchers | null,
  options: Avia.Options | null
): Avia.FormFieldProps<PhotoFolderInfoAttributes>[] => {
  const { airlines, airports, manufacturers, models } = options ?? {};
  return [
    {
      name: 'date',
      label: 'Date',
      isDate: true,
    },
    {
      name: 'place',
      label: 'Place',
      matchers: matchers?.airports,
      options: airports,
    },
    {
      name: 'registration',
      label: 'Registration',
    },
    {
      name: 'cn',
      label: 'CN',
    },
    {
      name: 'carrier',
      label: 'Carrier',
      matchers: matchers?.airlines,
      options: airlines,
    },
    {
      name: 'manufacturer',
      label: 'Manufacturer',
      matchers: matchers?.manufacturers,
      options: manufacturers,
    },
    {
      name: 'model',
      label: 'Model',
      matchers: matchers?.models,
      options: models,
    },
    {
      name: 'firstFlight',
      label: 'First flight',
      isDate: true,
    },
    {
      name: 'airplaneName',
      label: 'Airplane name',
    },
    {
      name: 'planespottersUrl',
      label: 'Planespotters URL',
      type: 'url',
    },
    {
      name: 'extraLink',
      label: 'Extra link',
      type: 'url',
    },
    {
      name: 'flown',
      label: 'Flown',
      type: 'checkbox',
    },
    {
      name: 'modelled',
      label: 'Modelled',
      type: 'checkbox',
    },
    {
      name: 'infoReady',
      label: 'Info ready',
      type: 'checkbox',
    },
    {
      name: 'readyToPublish',
      label: 'Ready to publish',
      type: 'checkbox',
    },
  ];
};

export default getFormFieldsSchema;
