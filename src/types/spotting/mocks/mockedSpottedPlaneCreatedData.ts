import { SpottedPlaneCreatedData } from '@/types/spotting';

import {
  mockedSpottedPlaneCreatedAttributesFull,
  mockedSpottedPlaneCreatedAttributesFullEmpty,
  mockedSpottedPlaneCreatedAttributesFullMixed,
  mockedSpottedPlaneCreatedAttributesRequired,
  mockedSpottedPlaneCreatedAttributesRequiredEmpty,
  mockedSpottedPlaneCreatedAttributesRequiredMixed,
} from '@/types/spotting/mocks/mockedSpottedPlaneCreatedAttributes';

export const mockedSpottedPlaneCreatedDataFull: SpottedPlaneCreatedData = {
  id: 'id-full',
  attributes: mockedSpottedPlaneCreatedAttributesFull,
};

export const mockedSpottedPlaneCreatedDataRequired: SpottedPlaneCreatedData = {
  id: 'id-required',
  attributes: mockedSpottedPlaneCreatedAttributesRequired,
};

export const mockedSpottedPlaneCreatedDataFullEmpty: SpottedPlaneCreatedData = {
  id: 'id-full-empty',
  attributes: mockedSpottedPlaneCreatedAttributesFullEmpty,
};

export const mockedSpottedPlaneCreatedDataRequiredEmpty: SpottedPlaneCreatedData =
  {
    id: 'id-required-empty',
    attributes: mockedSpottedPlaneCreatedAttributesRequiredEmpty,
  };

export const mockedSpottedPlaneCreatedDataFullMixed: SpottedPlaneCreatedData = {
  id: 'id-full-mixed',
  attributes: mockedSpottedPlaneCreatedAttributesFullMixed,
};

export const mockedSpottedPlaneCreatedDataRequiredMixed: SpottedPlaneCreatedData =
  {
    id: 'id-required-mixed',
    attributes: mockedSpottedPlaneCreatedAttributesRequiredMixed,
  };
