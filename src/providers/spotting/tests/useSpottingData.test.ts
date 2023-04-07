import { renderHook, act } from '@testing-library/react';

import useSpottingData, {
  defaultDescriptionData,
} from '@/providers/spotting/hooks/useSpottingData';

describe('useSpottingData', () => {
  const mockedPlane1 = {
    id: 'mocked-plane-1-id',
    attributes: {
      airplaneName: 'Airplane name 1',
      cn: '1000',
      carrier: 'Carrier 1',
      firstFlight: '2011-01-01',
      flown: false,
      groupPost: false,
      manufacturer: 'Manufacturer 1',
      model: 'model 1',
      modelled: false,
      name: 'Name 1',
      photosUrl: 'photosUrl1',
      place: 'Place 1',
      planespottersUrl: 'planespottersUrl',
      registration: 'registration 1',
      spottedDate: '2021-01-01',
      url: 'url1',
      photoUrl: 'photoUrl1',
    },
  };
  const mockedPlane2 = {
    id: 'mocked-plane-2-id',
    attributes: {
      airplaneName: 'Airplane name 2',
      cn: '2000',
      carrier: 'Carrier 2',
      firstFlight: '2012-02-02',
      flown: true,
      groupPost: true,
      manufacturer: 'Manufacturer 2',
      model: 'model 2',
      modelled: true,
      name: 'Name 2',
      photosUrl: 'photosUrl2',
      place: 'Place 2',
      planespottersUrl: 'planespottersUrl',
      registration: 'registration 2',
      spottedDate: '2022-02-02',
      url: 'url2',
      photoUrl: 'photoUrl2',
    },
  };
  const mockedPlane3 = {
    id: 'mocked-plane-3-id',
    attributes: {
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
    },
  };
  const mockedData = [mockedPlane1, mockedPlane2, mockedPlane3];
  const expectedFunctions = {
    updateDescription: expect.any(Function),
    updateHashtags: expect.any(Function),
    updateNewFirstFlight: expect.any(Function),
    updateGroupName: expect.any(Function),
    updateGroupDescription: expect.any(Function),
    updateGroupHashtags: expect.any(Function),
    getUpdateFunctions: expect.any(Function),
    filterPlanes: expect.any(Function),
    addSelectedId: expect.any(Function),
    removeSelectedIds: expect.any(Function),
  };

  test('returns data', () => {
    // Arrange
    const expectedResult = {
      spottedPlanes: [
        {
          ...mockedPlane1.attributes,
          id: mockedPlane1.id,
          ...defaultDescriptionData,
        },
        {
          ...mockedPlane2.attributes,
          id: mockedPlane2.id,
          ...defaultDescriptionData,
        },
        {
          ...mockedPlane3.attributes,
          id: mockedPlane3.id,
          ...defaultDescriptionData,
        },
      ],
      selectedIds: [],
      ...expectedFunctions,
    };
    // Act
    const { result } = renderHook(() => useSpottingData(mockedData));
    const { current } = result;
    // Assert
    expect(current).toEqual(expectedResult);
  });

  describe('when got no api data', () => {
    test('returns empty data', () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: [],
        selectedIds: [],
        ...expectedFunctions,
      };
      // Act
      const { result } = renderHook(() => useSpottingData(null));
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when updates spotting data', () => {
    test('returns updated data', async () => {
      // Arrange
      const description = 'This is spotted plane';
      const hashtags = '#spotted_plane_1';
      const newFirstFlight = '2023-04-07';
      const groupName = 'Spotting Group';
      const groupDescription = 'This is Spotting Group';
      const groupHashtags = '#spotting-group';

      const expectedResult = {
        spottedPlanes: [
          {
            ...mockedPlane1.attributes,
            id: mockedPlane1.id,
            ...defaultDescriptionData,
            description,
            groupName,
          },
          {
            ...mockedPlane2.attributes,
            id: mockedPlane2.id,
            ...defaultDescriptionData,
            hashtags,
            groupDescription,
          },
          {
            ...mockedPlane3.attributes,
            id: mockedPlane3.id,
            ...defaultDescriptionData,
            newFirstFlight,
            groupHashtags,
          },
        ],
        selectedIds: [],
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.updateDescription(mockedPlane1.id, description);
        result.current.updateHashtags(mockedPlane2.id, hashtags);
        result.current.updateNewFirstFlight(mockedPlane3.id, newFirstFlight);
        result.current.updateGroupName(mockedPlane1.id, groupName);
        result.current.updateGroupDescription(
          mockedPlane2.id,
          groupDescription
        );
        result.current.updateGroupHashtags(mockedPlane3.id, groupHashtags);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when updates spotting data with getUpdateFunctions', () => {
    test('returns updated data', async () => {
      // Arrange
      const description = 'This is spotted plane';
      const hashtags = '#spotted_plane_1';
      const newFirstFlight = '2023-04-07';
      const groupName = 'Spotting Group';
      const groupDescription = 'This is Spotting Group';
      const groupHashtags = '#spotting-group';

      const expectedResult = {
        spottedPlanes: [
          {
            ...mockedPlane1.attributes,
            id: mockedPlane1.id,
            ...defaultDescriptionData,
          },
          {
            ...mockedPlane2.attributes,
            id: mockedPlane2.id,
            ...defaultDescriptionData,
          },
          {
            ...mockedPlane3.attributes,
            id: mockedPlane3.id,
            ...defaultDescriptionData,
            description,
            hashtags,
            newFirstFlight,
            groupName,
            groupDescription,
            groupHashtags,
          },
        ],
        selectedIds: [],
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        const {
          updateDescription,
          updateHashtags,
          updateNewFirstFlight,
          updateGroupName,
          updateGroupDescription,
          updateGroupHashtags,
        } = result.current.getUpdateFunctions(mockedPlane3.id);

        updateDescription(description);
        updateHashtags(hashtags);
        updateNewFirstFlight(newFirstFlight);
        updateGroupName(groupName);
        updateGroupDescription(groupDescription);
        updateGroupHashtags(groupHashtags);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when filters planes', () => {
    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: [
          {
            ...mockedPlane2.attributes,
            id: mockedPlane2.id,
            ...defaultDescriptionData,
          },
        ],
        selectedIds: [],
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.filterPlanes([mockedPlane1.id, mockedPlane3.id]);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when selects id', () => {
    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: [
          {
            ...mockedPlane1.attributes,
            id: mockedPlane1.id,
            ...defaultDescriptionData,
          },
          {
            ...mockedPlane2.attributes,
            id: mockedPlane2.id,
            ...defaultDescriptionData,
          },
          {
            ...mockedPlane3.attributes,
            id: mockedPlane3.id,
            ...defaultDescriptionData,
          },
        ],
        selectedIds: [mockedPlane1.id],
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.addSelectedId(mockedPlane1.id);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when unselects ids', () => {
    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: [
          {
            ...mockedPlane1.attributes,
            id: mockedPlane1.id,
            ...defaultDescriptionData,
          },
          {
            ...mockedPlane2.attributes,
            id: mockedPlane2.id,
            ...defaultDescriptionData,
          },
          {
            ...mockedPlane3.attributes,
            id: mockedPlane3.id,
            ...defaultDescriptionData,
          },
        ],
        selectedIds: [mockedPlane2.id],
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.addSelectedId(mockedPlane1.id);
        result.current.addSelectedId(mockedPlane2.id);
        result.current.addSelectedId(mockedPlane3.id);
        result.current.removeSelectedIds([mockedPlane1.id, mockedPlane3.id]);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });
});
