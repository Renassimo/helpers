import { SpottedPlaneApiData } from '@/spotting/types';

import {
  mockedSpottedPlaneApiDataAttributesEmpty,
  mockedSpottedPlaneApiDataAttributesFalsy,
  mockedSpottedPlaneApiDataAttributesMixed,
  mockedSpottedPlaneApiDataAttributesNullish,
  mockedSpottedPlaneApiDataAttributesTruthy,
} from '@/spotting/types/mocks/mockedSpottedPlaneApiDataAttributes';

export const mockedSpottedPlaneApiDataNullish: SpottedPlaneApiData = {
  id: 'id-nullish',
  attributes: mockedSpottedPlaneApiDataAttributesNullish,
};

export const mockedSpottedPlaneApiDataTruthy: SpottedPlaneApiData = {
  id: 'id-truthy',
  attributes: mockedSpottedPlaneApiDataAttributesTruthy,
};

export const mockedSpottedPlaneApiDataFalsy: SpottedPlaneApiData = {
  id: 'id-falsy',
  attributes: mockedSpottedPlaneApiDataAttributesFalsy,
};

export const mockedSpottedPlaneApiDataEmpty: SpottedPlaneApiData = {
  id: 'id-empty',
  attributes: mockedSpottedPlaneApiDataAttributesEmpty,
};

export const mockedSpottedPlaneApiDataMixed: SpottedPlaneApiData = {
  id: 'id-mixed',
  attributes: mockedSpottedPlaneApiDataAttributesMixed,
};
