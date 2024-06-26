import {
  mockedSpottedPlaneProviderDataFalsy,
  mockedSpottedPlaneProviderDataMixed,
  mockedSpottedPlaneProviderDataNullish,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/spotting/types/mocks/mockedSpottedPlaneProviderData';
import { getCommons } from '@/spotting/utils/commons';

describe('Commons', () => {
  const mockedSelectedIds = [
    mockedSpottedPlaneProviderDataTruthy.id,
    mockedSpottedPlaneProviderDataFalsy.id,
    mockedSpottedPlaneProviderDataMixed.id,
  ];

  describe('when all 3 planes are different', () => {
    test('returns falsy commons', () => {
      // Arrange
      const mockedSpottingData = {
        [mockedSpottedPlaneProviderDataTruthy.id]:
          mockedSpottedPlaneProviderDataTruthy,
        [mockedSpottedPlaneProviderDataFalsy.id]:
          mockedSpottedPlaneProviderDataFalsy,
        [mockedSpottedPlaneProviderDataMixed.id]:
          mockedSpottedPlaneProviderDataMixed,
        [mockedSpottedPlaneProviderDataNullish.id]:
          mockedSpottedPlaneProviderDataNullish,
      };
      const expectedResult = {
        isCommonCarrierModel: false,
        isCommonPlane: false,
        isCommonPlaceAndDate: false,
      };
      // Act
      const result = getCommons(mockedSelectedIds, mockedSpottingData);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when only one plane is different', () => {
    test('returns falsy commons', () => {
      // Arrange
      const mockedSpottingData = {
        [mockedSpottedPlaneProviderDataTruthy.id]:
          mockedSpottedPlaneProviderDataTruthy,
        [mockedSpottedPlaneProviderDataFalsy.id]: {
          ...mockedSpottedPlaneProviderDataTruthy,
          id: mockedSpottedPlaneProviderDataFalsy.id,
          manufacturer: mockedSpottedPlaneProviderDataFalsy.manufacturer,
        },
        [mockedSpottedPlaneProviderDataMixed.id]:
          mockedSpottedPlaneProviderDataMixed,
        [mockedSpottedPlaneProviderDataNullish.id]:
          mockedSpottedPlaneProviderDataNullish,
      };
      const expectedResult = {
        isCommonCarrierModel: false,
        isCommonPlane: false,
        isCommonPlaceAndDate: false,
      };
      // Act
      const result = getCommons(mockedSelectedIds, mockedSpottingData);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when all 3 planes are common', () => {
    test('returns truthy commons', () => {
      // Arrange
      const mockedSpottingData = {
        [mockedSpottedPlaneProviderDataTruthy.id]: {
          ...mockedSpottedPlaneProviderDataTruthy,
          id: mockedSpottedPlaneProviderDataTruthy.id,
        },
        [mockedSpottedPlaneProviderDataFalsy.id]: {
          ...mockedSpottedPlaneProviderDataTruthy,
          id: mockedSpottedPlaneProviderDataFalsy.id,
        },
        [mockedSpottedPlaneProviderDataMixed.id]: {
          ...mockedSpottedPlaneProviderDataTruthy,
          id: mockedSpottedPlaneProviderDataMixed.id,
        },
        [mockedSpottedPlaneProviderDataNullish.id]:
          mockedSpottedPlaneProviderDataNullish,
      };
      const expectedResult = {
        isCommonCarrierModel: true,
        isCommonPlane: true,
        isCommonPlaceAndDate: true,
      };
      // Act
      const result = getCommons(mockedSelectedIds, mockedSpottingData);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when all 3 planes are common and in different data and place', () => {
    test('returns truthy and falsy commons', () => {
      // Arrange
      const mockedSpottingData = {
        [mockedSpottedPlaneProviderDataTruthy.id]: {
          ...mockedSpottedPlaneProviderDataTruthy,
          id: mockedSpottedPlaneProviderDataTruthy.id,
          place: mockedSpottedPlaneProviderDataTruthy.place,
          spottedDate: mockedSpottedPlaneProviderDataTruthy.spottedDate,
        },
        [mockedSpottedPlaneProviderDataFalsy.id]: {
          ...mockedSpottedPlaneProviderDataTruthy,
          id: mockedSpottedPlaneProviderDataFalsy.id,
          place: mockedSpottedPlaneProviderDataFalsy.place,
          spottedDate: mockedSpottedPlaneProviderDataFalsy.spottedDate,
        },
        [mockedSpottedPlaneProviderDataMixed.id]: {
          ...mockedSpottedPlaneProviderDataTruthy,
          id: mockedSpottedPlaneProviderDataMixed.id,
          place: mockedSpottedPlaneProviderDataMixed.place,
          spottedDate: mockedSpottedPlaneProviderDataMixed.spottedDate,
        },
        [mockedSpottedPlaneProviderDataNullish.id]:
          mockedSpottedPlaneProviderDataNullish,
      };
      const expectedResult = {
        isCommonCarrierModel: true,
        isCommonPlane: true,
        isCommonPlaceAndDate: false,
      };
      // Act
      const result = getCommons(mockedSelectedIds, mockedSpottingData);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
