import { SpottedPlaneCreatedAttributes } from '@/types/spotting';

export const mockedSpottedPlaneCreatedAttributesFull: SpottedPlaneCreatedAttributes =
  {
    description: 'description 1',
    hashtags: '#hashtags1',
    newFirstFlight: '2012-03-04',
  };

export const mockedSpottedPlaneCreatedAttributesRequired: SpottedPlaneCreatedAttributes =
  {
    description: 'description 2',
    hashtags: '#hashtags2',
  };

export const mockedSpottedPlaneCreatedAttributesFullEmpty: SpottedPlaneCreatedAttributes =
  {
    description: '',
    hashtags: '',
    newFirstFlight: '',
  };

export const mockedSpottedPlaneCreatedAttributesRequiredEmpty: SpottedPlaneCreatedAttributes =
  {
    description: '',
    hashtags: '',
  };

export const mockedSpottedPlaneCreatedAttributesFullMixed: SpottedPlaneCreatedAttributes =
  {
    description: '',
    hashtags: '#hashtags5',
    newFirstFlight: '2022-03-04',
  };

export const mockedSpottedPlaneCreatedAttributesRequiredMixed: SpottedPlaneCreatedAttributes =
  {
    description: 'description 6',
    hashtags: '',
  };
