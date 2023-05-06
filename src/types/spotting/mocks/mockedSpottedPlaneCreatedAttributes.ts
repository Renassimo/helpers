import { SpottedPlaneCreatedAttributes } from '@/types/spotting';

export const mockedSpottedPlaneCreatedAttributesFull: SpottedPlaneCreatedAttributes =
  {
    description: 'description 1',
    hashtags: '#hashtags1',
    newFirstFlight: '2012-03-04',
    groupName: 'groupName 1',
    groupDescription: 'groupDescription 1',
    groupHashtags: '#groupHashtags1',
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
    groupName: '',
    groupDescription: '',
    groupHashtags: '',
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
    groupName: '',
    groupDescription: 'groupDescription 5',
    groupHashtags: '#groupHashtags1',
  };

export const mockedSpottedPlaneCreatedAttributesRequiredMixed: SpottedPlaneCreatedAttributes =
  {
    description: 'description 6',
    hashtags: '',
  };
