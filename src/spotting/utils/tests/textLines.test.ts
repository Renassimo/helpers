import {
  getDescriptionLines,
  getFirstSelectedDescriptionLines,
  getHashtagLines,
  getNextSelectedDescriptionLines,
  mergeLines,
} from '@/spotting/utils';

import {
  mockedSpottedPlaneProviderDataFalsy,
  mockedSpottedPlaneProviderDataNullish,
  mockedSpottedPlaneProviderDataTruthy,
} from '@/spotting/types/mocks/mockedSpottedPlaneProviderData';

import { LineWord, SpottedPlaneProviderData } from '@/spotting/types';

describe('Text lines', () => {
  const mockedPlane1: SpottedPlaneProviderData =
    mockedSpottedPlaneProviderDataFalsy;
  const mockedPlane2: SpottedPlaneProviderData =
    mockedSpottedPlaneProviderDataTruthy;
  const mockedPlane3: SpottedPlaneProviderData =
    mockedSpottedPlaneProviderDataNullish;

  describe('getDescriptionLines', () => {
    describe('when got data with false booleans', () => {
      const mockedData: SpottedPlaneProviderData = mockedPlane1;

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [mockedData.manufacturer, mockedData.model, mockedData.carrier],
          [mockedData.airplaneName],
          [mockedData.registration, `(cn ${mockedData.cn})`],
          [`First flight 10.03.2014`],
          [mockedData.place, '02.02.2022'],
          ['#7878_35942'],
          [undefined],
          [false],
        ];
        // Act
        const result = getDescriptionLines(mockedData);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got data with true booleans', () => {
      const mockedData: SpottedPlaneProviderData = {
        ...mockedPlane2,
        model: '737800F',
      };

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [mockedData.manufacturer, mockedData.model, mockedData.carrier],
          [mockedData.airplaneName],
          [mockedData.registration, `(cn ${mockedData.cn})`],
          [`First flight 21.01.2015`],
          [mockedData.place, '27.12.2015'],
          ['#737800F_007'],
          ['#737800_007'],
          ['#renassimo_flown'],
        ];
        // Act
        const result = getDescriptionLines(mockedData);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got nullish data', () => {
      const mockedData = mockedPlane3;

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [null, null, null],
          [null],
          [null, null],
          [null],
          [null, null],
          [null],
          [null],
          [false],
        ];
        // Act
        const result = getDescriptionLines(mockedData);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getHashtagLines', () => {
    describe('when got data with false booleans', () => {
      const mockedData: SpottedPlaneProviderData = {
        ...mockedPlane1,
        model: '737500',
        carrier: 'AirAsiaJapan',
      };

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [
            '#avr_737500',
            '#avr_Boeing',
            '#avr_737family #avr_737classic',
            '#avr_AirAsia',
            '#avr_AirAsiaJapan',
            '#avr_WAW_EPWA',
            '\n',
          ],
          ['#renassimo_spotted', '\n'],
          [null],
          [
            '#Boeing',
            '#737500',
            '#737family #737classic',
            '#AirAsia',
            '#AirAsiaJapan',
            '\n',
          ],
          [
            '#spotting #aviation #avgeek #flywithme #planes #jets #jetlovers',
            '#kznspotting #waw #epwa #wawspotting #warsawspotting',
            false,
          ],
        ];
        // Act
        const result = getHashtagLines(mockedData);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got data with true booleans', () => {
      const mockedData: SpottedPlaneProviderData = {
        ...mockedPlane2,
        model: '737800F',
      };

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [
            '#avr_737800F',
            '#avr_Airbus',
            '#avr_737family #avr_737ng #avr_737freighter #avr_freighter',
            null,
            '#avr_QatarAirways',
            '#avr_DOH_OTHH',
            '\n',
          ],
          ['#renassimo_spotted', '\n'],
          ['#renassimo_modelled', '\n'],
          [
            '#Airbus',
            '#737800F',
            '#737family #737ng',
            null,
            '#QatarAirways',
            '\n',
          ],
          [
            '#spotting #aviation #avgeek #flywithme #planes #jets #jetlovers',
            '#kznspotting #waw #epwa #wawspotting #warsawspotting',
            '#aviamodel #aviamodelling #modelkit #scalemodel #plasticmodel #revell #zvezdamodels',
          ],
        ];
        // Act
        const result = getHashtagLines(mockedData);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got nullish data', () => {
      const mockedData = mockedPlane3;

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [null, null, null, null, null, null],
          [null],
          [null],
          [null, null, null, null, null],
          [
            '#spotting #aviation #avgeek #flywithme #planes #jets #jetlovers',
            null,
            false,
          ],
        ];
        // Act
        const result = getHashtagLines(mockedData);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('Group Description lines', () => {
    const manufacturerModelCarrierLine = ['Airbus', 'A220-300', 'Swiss'];
    const airplaneNameLine = ['Helvetic'];
    const registrationLine = ['HS-DBU'];
    const firstFlightLine = ['First Flight 1'];
    const placeDateLine = ['WAW 2021'];
    const planeHashtagLines = [
      ['#hashtag1_1'],
      ['#hashtag1_2'],
      ['#hashtag1_3'],
    ];
    const lines = [
      manufacturerModelCarrierLine,
      airplaneNameLine,
      registrationLine,
      firstFlightLine,
      placeDateLine,
      ...planeHashtagLines,
    ];

    describe('getFirstSelectedDescriptionLines', () => {
      describe('when got same planes', () => {
        const mockedCommons = {
          isCommonCarrierModel: true,
          isCommonPlane: true,
          isCommonPlaceAndDate: false,
        };

        test('return updated lines', () => {
          // Arrange
          const expectedResult = [
            manufacturerModelCarrierLine,
            airplaneNameLine,
            registrationLine,
            firstFlightLine,
            ...planeHashtagLines,
          ];
          // Act
          const result = getFirstSelectedDescriptionLines(lines, mockedCommons);
          // Assert
          expect(result).toEqual(expectedResult);
        });
      });

      describe('when got same carrier model', () => {
        const mockedCommons = {
          isCommonCarrierModel: true,
          isCommonPlane: false,
          isCommonPlaceAndDate: false,
        };

        test('return updated lines', () => {
          // Arrange
          const expectedResult = [manufacturerModelCarrierLine];
          // Act
          const result = getFirstSelectedDescriptionLines(lines, mockedCommons);
          // Assert
          expect(result).toEqual(expectedResult);
        });
      });

      describe('when got place and date', () => {
        const mockedCommons = {
          isCommonCarrierModel: false,
          isCommonPlane: false,
          isCommonPlaceAndDate: true,
        };

        test('return updated lines', () => {
          // Arrange
          const expectedResult = [placeDateLine];
          // Act
          const result = getFirstSelectedDescriptionLines(lines, mockedCommons);
          // Assert
          expect(result).toEqual(expectedResult);
        });
      });
    });

    describe('getNextSelectedDescriptionLines', () => {
      describe('when got same planes', () => {
        const mockedCommons = {
          isCommonCarrierModel: true,
          isCommonPlane: true,
          isCommonPlaceAndDate: false,
        };

        test('return updated lines', () => {
          // Arrange
          const expectedResult = [placeDateLine];
          // Act
          const result = getNextSelectedDescriptionLines(lines, mockedCommons);
          // Assert
          expect(result).toEqual(expectedResult);
        });
      });

      describe('when got same carrier model', () => {
        const mockedCommons = {
          isCommonCarrierModel: true,
          isCommonPlane: false,
          isCommonPlaceAndDate: false,
        };

        test('return updated lines', () => {
          // Arrange
          const expectedResult = [
            airplaneNameLine,
            registrationLine,
            firstFlightLine,
            placeDateLine,
            ...planeHashtagLines,
          ];
          // Act
          const result = getNextSelectedDescriptionLines(lines, mockedCommons);
          // Assert
          expect(result).toEqual(expectedResult);
        });
      });

      describe('when got place and date', () => {
        const mockedCommons = {
          isCommonCarrierModel: false,
          isCommonPlane: false,
          isCommonPlaceAndDate: true,
        };

        test('return updated lines', () => {
          // Arrange
          const expectedResult = [
            manufacturerModelCarrierLine,
            airplaneNameLine,
            registrationLine,
            firstFlightLine,
            ...planeHashtagLines,
          ];
          // Act
          const result = getNextSelectedDescriptionLines(lines, mockedCommons);
          // Assert
          expect(result).toEqual(expectedResult);
        });
      });
    });
  });

  describe('mergeLines', () => {
    test('returns merged lines', () => {
      // Arrange
      const line1: LineWord[] = [
        'text1',
        'text2',
        null,
        undefined,
        false,
        '\n',
      ];
      const line2: LineWord[] = [
        'text1',
        'text2',
        'text3',
        null,
        undefined,
        false,
      ];
      const expectedResult = [
        'text1',
        'text2',
        null,
        undefined,
        false,
        'text3',
      ];
      // Act
      const result = mergeLines(line1, line2);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
