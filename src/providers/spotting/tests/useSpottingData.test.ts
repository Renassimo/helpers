import { renderHook, act } from '@testing-library/react';

import useSpottingData, {
  defaultDescriptionData,
} from '@/providers/spotting/hooks/useSpottingData';

import {
  appendEmptyLines,
  convertLinesIntoText,
  getDescriptionLines,
  getHashtagLines,
  putTheLine,
} from '@/utils/spotting';
import {
  mockedSpottedPlaneApiDataFalsy,
  mockedSpottedPlaneApiDataNullish,
  mockedSpottedPlaneApiDataTruthy,
} from '@/types/spotting/mocks';

jest.mock('@/utils/spotting');

describe('useSpottingData', () => {
  const mockedPlane1 = mockedSpottedPlaneApiDataFalsy;
  const mockedPlane2 = mockedSpottedPlaneApiDataTruthy;
  const mockedPlane3 = mockedSpottedPlaneApiDataNullish;
  const mockedData = [mockedPlane1, mockedPlane2, mockedPlane3];
  const expectedProviderData = {
    selectedIds: [],
    groupName: '',
    groupDescription: '',
    groupHashtags: '',
  };
  const expectedFunctions = {
    removeSpottedPlane: expect.any(Function),
    updateDescription: expect.any(Function),
    updateHashtags: expect.any(Function),
    updateNewFirstFlight: expect.any(Function),
    addSelectedId: expect.any(Function),
    removeSelectedIds: expect.any(Function),
    generateDescription: expect.any(Function),
    generateHashtags: expect.any(Function),
    clearDescription: expect.any(Function),
    clearHashtags: expect.any(Function),
    setGroupDescription: expect.any(Function),
    setGroupHashtags: expect.any(Function),
    setGroupName: expect.any(Function),
    generateGroupDescriptionAndHashtags: expect.any(Function),
    clearGroupData: expect.any(Function),
    clearSelectedIds: expect.any(Function),
  };
  const expectedPlane1 = {
    ...mockedPlane1.attributes,
    id: mockedPlane1.id,
    ...defaultDescriptionData,
  };
  const expectedPlane2 = {
    ...mockedPlane2.attributes,
    id: mockedPlane2.id,
    ...defaultDescriptionData,
  };
  const expectedPlane3 = {
    ...mockedPlane3.attributes,
    id: mockedPlane3.id,
    ...defaultDescriptionData,
  };
  const expectedPlanes = [expectedPlane1, expectedPlane2, expectedPlane3];

  test('returns data', () => {
    // Arrange
    const expectedResult = {
      spottedPlanes: expectedPlanes,
      ...expectedProviderData,
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
        ...expectedProviderData,
        ...expectedFunctions,
      };
      // Act
      const { result } = renderHook(() => useSpottingData(null));
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when removes spotted plane', () => {
    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: [expectedPlane1, expectedPlane3],
        ...expectedProviderData,
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.removeSpottedPlane(mockedPlane2.id);
      });
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

      const expectedResult = {
        spottedPlanes: [
          {
            ...expectedPlane1,
            description,
          },
          {
            ...expectedPlane2,
            hashtags,
          },
          {
            ...expectedPlane3,
            newFirstFlight,
          },
        ],
        ...expectedProviderData,
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.updateDescription(mockedPlane1.id, description);
        result.current.updateHashtags(mockedPlane2.id, hashtags);
        result.current.updateNewFirstFlight(mockedPlane3.id, newFirstFlight);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when selects id', () => {
    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: expectedPlanes,
        ...expectedProviderData,
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
        spottedPlanes: expectedPlanes,
        ...expectedProviderData,
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

  describe('when generates description', () => {
    const mockedLines = [['line1'], ['line2']];
    const mockedText = 'mocked description';
    const mockedGetDescriptionLines = jest.fn(() => mockedLines);
    const mockedConvertLinesIntoText = jest.fn(() => mockedText);

    beforeEach(() => {
      (getDescriptionLines as unknown as jest.Mock).mockImplementationOnce(
        mockedGetDescriptionLines
      );
      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoText
      );
    });

    test('returns updated data', async () => {
      // Arrange
      const mockedSpottedPlane1 = {
        ...mockedPlane1.attributes,
        id: mockedPlane1.id,
        ...defaultDescriptionData,
      };
      const expectedResult = {
        spottedPlanes: [
          { ...expectedPlane1, description: mockedText },
          expectedPlane2,
          expectedPlane3,
        ],
        ...expectedProviderData,
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.generateDescription(mockedPlane1.id);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
      expect(mockedGetDescriptionLines).toHaveBeenCalledWith(
        mockedSpottedPlane1
      );
      expect(mockedConvertLinesIntoText).toHaveBeenCalledWith(mockedLines);
    });
  });

  describe('when generates hashtags', () => {
    const mockedLines = [['#line1'], ['#line2']];
    const mockedText = '#mocked #description';
    const mockedGetHashtagLines = jest.fn(() => mockedLines);
    const mockedConvertLinesIntoText = jest.fn(() => mockedText);

    beforeEach(() => {
      (getHashtagLines as unknown as jest.Mock).mockImplementationOnce(
        mockedGetHashtagLines
      );
      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoText
      );
    });

    test('returns updated data', async () => {
      // Arrange
      const mockedSpottedPlane2 = {
        ...mockedPlane2.attributes,
        id: mockedPlane2.id,
        ...defaultDescriptionData,
      };
      const expectedResult = {
        spottedPlanes: [
          expectedPlane1,
          {
            ...expectedPlane2,
            hashtags: mockedText,
          },
          expectedPlane3,
        ],
        ...expectedProviderData,
        ...expectedFunctions,
      };

      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.generateHashtags(mockedPlane2.id);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
      expect(mockedGetHashtagLines).toHaveBeenCalledWith(mockedSpottedPlane2);
      expect(mockedConvertLinesIntoText).toHaveBeenCalledWith(mockedLines);
    });
  });

  describe('when clears description', () => {
    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: expectedPlanes,
        ...expectedProviderData,
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.generateDescription(mockedPlane1.id);
        result.current.clearDescription(mockedPlane1.id);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when clears hashtags', () => {
    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: expectedPlanes,
        ...expectedProviderData,
        ...expectedFunctions,
      };

      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.generateHashtags(mockedPlane2.id);
        result.current.clearHashtags(mockedPlane2.id);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when clears selected ids', () => {
    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: expectedPlanes,
        ...expectedProviderData,
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.addSelectedId(mockedPlane1.id);
        result.current.clearSelectedIds();
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when sets group data', () => {
    test('returns updated data', async () => {
      // Arrange
      const mockedGroupName = 'Group Name';
      const mockedGroupDescription = 'Group description';
      const mockedGroupHashtags = '#groupHashtags';
      const expectedResult = {
        spottedPlanes: expectedPlanes,
        ...expectedProviderData,
        ...expectedFunctions,
        groupName: mockedGroupName,
        groupDescription: mockedGroupDescription,
        groupHashtags: mockedGroupHashtags,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.setGroupName(mockedGroupName);
        result.current.setGroupDescription(mockedGroupDescription);
        result.current.setGroupHashtags(mockedGroupHashtags);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when generates groupDescriptionAndHashtags', () => {
    const mockedLines = [['line1'], ['line2']];
    const mockedText = 'mockedText';
    const mockedHashtags = '#renassimo_spotted #mockedHashtags';
    const mockedLine = 'descriptionLine\n\n';
    const mockedGetHashtagLines = jest.fn(() => mockedLines);
    const mockedPutTheLine = jest.fn(() => mockedLine);
    const mockedGetDescriptionLines = jest.fn(() => mockedLines);
    const mockedConvertLinesIntoText = jest.fn(() => mockedText);
    const mockedConvertLinesIntoTextHashtags = jest.fn(() => mockedHashtags);
    const mockedAppendEmptyLines = jest.fn(() => mockedHashtags);

    beforeEach(() => {
      (putTheLine as unknown as jest.Mock).mockImplementation(mockedPutTheLine);
      (getDescriptionLines as unknown as jest.Mock).mockImplementation(
        mockedGetDescriptionLines
      );
      (getHashtagLines as unknown as jest.Mock).mockImplementation(
        mockedGetHashtagLines
      );
      (appendEmptyLines as unknown as jest.Mock).mockImplementation(
        mockedAppendEmptyLines
      );

      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoText
      );
      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoText
      );

      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoText
      );
      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoText
      );

      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoTextHashtags
      );

      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoText
      );
      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoText
      );

      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoTextHashtags
      );

      (convertLinesIntoText as unknown as jest.Mock).mockImplementationOnce(
        mockedConvertLinesIntoTextHashtags
      );
    });

    test('returns updated data', async () => {
      // Arrange
      const expectedResult = {
        spottedPlanes: [
          {
            ...expectedPlane1,
            description: mockedText,
            hashtags: mockedHashtags,
          },
          {
            ...expectedPlane2,
            description: mockedText,
            hashtags: mockedHashtags,
          },
          { ...expectedPlane3 },
        ],
        ...expectedProviderData,
        ...expectedFunctions,
        groupDescription: 'descriptionLine\n\n[]\nmockedText\n',
        groupHashtags: '#renassimo_spotted #mockedHashtags',
        selectedIds: [mockedPlane1.id, mockedPlane2.id],
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.addSelectedId(mockedPlane1.id);
        result.current.addSelectedId(mockedPlane2.id);
      });
      await act(() => {
        result.current.generateGroupDescriptionAndHashtags();
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
      expect(mockedAppendEmptyLines).toHaveBeenCalledWith(mockedHashtags);
    });
  });

  describe('when clears group data', () => {
    test('returns updated data', async () => {
      // Arrange
      const mockedGroupName = 'Group Name';
      const mockedGroupDescription = 'Group description';
      const mockedGroupHashtags = '#groupHashtags';
      const expectedResult = {
        spottedPlanes: expectedPlanes,
        ...expectedProviderData,
        ...expectedFunctions,
      };
      const { result } = renderHook(() => useSpottingData(mockedData));
      // Act
      await act(() => {
        result.current.setGroupName(mockedGroupName);
        result.current.setGroupDescription(mockedGroupDescription);
        result.current.setGroupHashtags(mockedGroupHashtags);
        result.current.clearGroupData();
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });
});
