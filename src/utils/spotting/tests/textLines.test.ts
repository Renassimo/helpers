import { getDescriptionLines, getHashtagLines } from '@/utils/spotting';

describe('Text lines', () => {
  const mockedPlane1 = {
    id: 'mocked-plane-1-id',
    airplaneName: 'Airplane name 1',
    cn: '1000',
    carrier: 'AirAsia Japan',
    firstFlight: '2011-01-01',
    flown: false,
    groupPost: false,
    manufacturer: 'Boeing',
    model: '737-500',
    modelled: false,
    name: 'Name 1',
    photosUrl: 'photosUrl1',
    place: 'KZN/UWKD',
    planespottersUrl: 'planespottersUrl',
    registration: 'registration 1',
    spottedDate: '2021-01-01',
    url: 'url1',
    photoUrl: 'photoUrl1',
    description: '',
    hashtags: '',
  };
  const mockedPlane2 = {
    id: 'mocked-plane-2-id',
    airplaneName: 'Airplane name 2',
    cn: '2000',
    carrier: 'AirBridge Cargo',
    firstFlight: null,
    flown: true,
    groupPost: true,
    manufacturer: 'Boeing',
    model: '737-800F',
    modelled: true,
    name: 'Name 2',
    photosUrl: 'photosUrl2',
    place: 'KZN/UWKD',
    planespottersUrl: 'planespottersUrl',
    registration: 'registration 2',
    spottedDate: '2022-02-02',
    url: 'url2',
    photoUrl: 'photoUrl2',
    description: '',
    hashtags: '',
    newFirstFlight: '2012-02-02',
    groupName: 'groupName1',
    groupDescription: 'groupDescription1',
    groupHashtags: '#groupHashtag1',
  };
  const mockedPlane3 = {
    id: 'mocked-plane-3-id',
    airplaneName: null,
    cn: null,
    carrier: null,
    firstFlight: null,
    flown: false,
    groupPost: false,
    manufacturer: null,
    model: null,
    modelled: false,
    name: null,
    photosUrl: null,
    place: null,
    planespottersUrl: null,
    registration: null,
    spottedDate: null,
    url: 'url3',
    photoUrl: null,
    description: '',
    hashtags: '',
  };

  describe('getDescriptionLines', () => {
    describe('when got data with false booleans', () => {
      const mockedData = mockedPlane1;

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [mockedData.manufacturer, mockedData.model, mockedData.carrier],
          [mockedData.name],
          [mockedData.registration, `(cn ${mockedData.cn})`],
          [`First flight 01.01.2011`],
          [mockedData.place, '01.01.2021'],
          ['#737500_1000'],
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
      const mockedData = mockedPlane2;

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [mockedData.manufacturer, mockedData.model, mockedData.carrier],
          [mockedData.name],
          [mockedData.registration, `(cn ${mockedData.cn})`],
          [`First flight 02.02.2012`],
          [mockedData.place, '02.02.2022'],
          ['#737800F_2000'],
          ['#737800_2000'],
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
      const mockedData = mockedPlane1;

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [
            '#avr_737500',
            '#avr_Boeing',
            '#avr_737family #avr_737classic',
            '#avr_AirAsia',
            '#avr_AirAsiaJapan',
            '#avr_KZN_UWKD',
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
      const mockedData = mockedPlane2;

      test('returns text lines', () => {
        // Arrange
        const expectedResult = [
          [
            '#avr_737800F',
            '#avr_Boeing',
            '#avr_737family #avr_737ng #avr_737freighter #avr_freighter',
            null,
            '#avr_AirBridgeCargo',
            '#avr_KZN_UWKD',
            '\n',
          ],
          ['#renassimo_spotted', '\n'],
          ['#renassimo_modelled', '\n'],
          [
            '#Boeing',
            '#737800F',
            '#737family #737ng',
            null,
            '#AirBridgeCargo',
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
});
