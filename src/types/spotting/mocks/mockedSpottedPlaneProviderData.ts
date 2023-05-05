import { SpottedPlaneProviderData } from '@/types/spotting';

import {
  mockedSpottedPlaneApiDataAttributesEmpty,
  mockedSpottedPlaneApiDataAttributesFalsy,
  mockedSpottedPlaneApiDataAttributesMixed,
  mockedSpottedPlaneApiDataAttributesNullish,
  mockedSpottedPlaneApiDataAttributesTruthy,
} from '@/types/spotting/mocks/mockedSpottedPlaneApiDataAttributes';
import {
  mockedSpottedPlaneCreatedAttributesFull,
  mockedSpottedPlaneCreatedAttributesFullEmpty,
  mockedSpottedPlaneCreatedAttributesFullMixed,
  mockedSpottedPlaneCreatedAttributesRequired,
  mockedSpottedPlaneCreatedAttributesRequiredEmpty,
} from '@/types/spotting/mocks/mockedSpottedPlaneCreatedAttributes';

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
