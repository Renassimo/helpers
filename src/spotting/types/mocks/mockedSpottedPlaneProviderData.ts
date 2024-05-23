import { SpottedPlaneProviderData } from '@/spotting/types';

import {
  mockedSpottedPlaneApiDataAttributesEmpty,
  mockedSpottedPlaneApiDataAttributesFalsy,
  mockedSpottedPlaneApiDataAttributesMixed,
  mockedSpottedPlaneApiDataAttributesNullish,
  mockedSpottedPlaneApiDataAttributesTruthy,
} from '@/spotting/types/mocks/mockedSpottedPlaneApiDataAttributes';
import {
  mockedSpottedPlaneCreatedAttributesFull,
  mockedSpottedPlaneCreatedAttributesFullEmpty,
  mockedSpottedPlaneCreatedAttributesFullMixed,
  mockedSpottedPlaneCreatedAttributesRequired,
  mockedSpottedPlaneCreatedAttributesRequiredEmpty,
} from '@/spotting/types/mocks/mockedSpottedPlaneCreatedAttributes';

export const mockedSpottedPlaneProviderDataNullish: SpottedPlaneProviderData = {
  id: 'id-nullish',
  ...mockedSpottedPlaneApiDataAttributesNullish,
  ...mockedSpottedPlaneCreatedAttributesRequiredEmpty,
};

export const mockedSpottedPlaneProviderDataTruthy: SpottedPlaneProviderData = {
  id: 'id-truthy',
  ...mockedSpottedPlaneApiDataAttributesTruthy,
  ...mockedSpottedPlaneCreatedAttributesFull,
};

export const mockedSpottedPlaneProviderDataFalsy: SpottedPlaneProviderData = {
  id: 'id-falsy',
  ...mockedSpottedPlaneApiDataAttributesFalsy,
  ...mockedSpottedPlaneCreatedAttributesRequired,
};

export const mockedSpottedPlaneProviderDataEmpty: SpottedPlaneProviderData = {
  id: 'id-empty',
  ...mockedSpottedPlaneApiDataAttributesEmpty,
  ...mockedSpottedPlaneCreatedAttributesFullEmpty,
};

export const mockedSpottedPlaneProviderDataMixed: SpottedPlaneProviderData = {
  id: 'id-mixed',
  ...mockedSpottedPlaneApiDataAttributesMixed,
  ...mockedSpottedPlaneCreatedAttributesFullMixed,
};
