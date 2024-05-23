import { renderHook } from '@testing-library/react';

import { SpottedPlaneProviderData } from '@/spotting/types';

import useAlerts from '@/common/hooks/alerts';
import useSpottedPlanes from '@/spotting/hooks/useSpottedPlanes';
import useApplySpottedPlanes from '@/spotting/hooks/useApplySpottedPlanes';
import useUpdateSpottedPlanes from '@/spotting/hooks/useUpdateSpottedPlanes';

jest.mock('@/common/hooks/alerts');
jest.mock('@/spotting/hooks/useSpottedPlanes');
jest.mock('@/spotting/hooks/useUpdateSpottedPlanes');

describe('useApplySpottedPlanes', () => {
  const plane1 = {
    id: 'id-1',
    description: 'description1',
    hashtags: '#hashtags1',
    newFirstFlight: '2021-01-01',
    groupName: 'groupName1',
    groupDescription: 'groupDescription1',
    groupHashtags: '#groupHashtags1',
  };
  const plane2 = {
    id: 'id-2',
    description: 'description2',
    hashtags: '#hashtags2',
  };
  const plane3 = {
    id: 'id-3',
    description: 'description3',
    hashtags: '#hashtags3',
  };
  const mockedCreateErrorAlert = jest.fn();
  const mockedRemoveSpottedPlane = jest.fn();

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => ({ createErrorAlert: mockedCreateErrorAlert }))
    );
    (useSpottedPlanes as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => ({ removeSpottedPlane: mockedRemoveSpottedPlane }))
    );
  });

  afterEach(() => [jest.clearAllMocks()]);

  test('updates spotted planes and deletes locally', async () => {
    // Arrange
    const payload = [plane1, plane2, null];

    const mockedUpdatePlanesData = [
      { id: plane1.id, ok: true },
      { id: plane2.id, ok: true },
    ];
    const mockedUpdatePlanes = jest.fn(() => ({
      data: mockedUpdatePlanesData,
    }));
    (useUpdateSpottedPlanes as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => ({ update: mockedUpdatePlanes }))
    );

    const {
      result: { current },
    } = renderHook(() => useApplySpottedPlanes());
    const { update } = current;
    // Act
    await update(payload as unknown as SpottedPlaneProviderData[]);
    // Assert
    expect(mockedCreateErrorAlert).not.toHaveBeenCalled();
    expect(mockedUpdatePlanes).toHaveBeenCalledWith({
      data: [
        {
          id: plane1.id,
          attributes: {
            description: plane1.description,
            hashtags: plane1.hashtags,
            newFirstFlight: plane1.newFirstFlight,
            groupName: plane1.groupName,
            groupDescription: plane1.groupDescription,
            groupHashtags: plane1.groupHashtags,
          },
        },
        {
          id: plane2.id,
          attributes: {
            description: plane2.description,
            hashtags: plane2.hashtags,
          },
        },
      ],
    });
    expect(mockedUpdatePlanes).toHaveBeenCalledTimes(1);
    expect(mockedRemoveSpottedPlane).toHaveBeenNthCalledWith(1, plane1.id);
    expect(mockedRemoveSpottedPlane).toHaveBeenNthCalledWith(2, plane2.id);
    expect(mockedRemoveSpottedPlane).toHaveBeenCalledTimes(2);
  });

  describe('when got not ok response', () => {
    test('alerts error and deletes updates planes locally', async () => {
      // Arrange
      const payload = [plane1, plane2, plane3];

      const mockedUpdatePlanesData = [
        { id: plane1.id, ok: false },
        { id: plane2.id, ok: false },
        { id: plane3.id, ok: true },
      ];
      const mockedUpdatePlanes = jest.fn(() => ({
        data: mockedUpdatePlanesData,
      }));
      (useUpdateSpottedPlanes as unknown as jest.Mock).mockImplementationOnce(
        jest.fn(() => ({ update: mockedUpdatePlanes }))
      );

      const {
        result: { current },
      } = renderHook(() => useApplySpottedPlanes());
      const { update } = current;
      // Act
      await update(payload as unknown as SpottedPlaneProviderData[]);
      // Assert
      expect(mockedCreateErrorAlert).toHaveBeenNthCalledWith(
        1,
        'Got error while updating id-1'
      );
      expect(mockedCreateErrorAlert).toHaveBeenNthCalledWith(
        2,
        'Got error while updating id-2'
      );
      expect(mockedCreateErrorAlert).toHaveBeenCalledTimes(2);
      expect(mockedUpdatePlanes).toHaveBeenCalledWith({
        data: [
          {
            id: plane1.id,
            attributes: {
              description: plane1.description,
              hashtags: plane1.hashtags,
              newFirstFlight: plane1.newFirstFlight,
              groupName: plane1.groupName,
              groupDescription: plane1.groupDescription,
              groupHashtags: plane1.groupHashtags,
            },
          },
          {
            id: plane2.id,
            attributes: {
              description: plane2.description,
              hashtags: plane2.hashtags,
            },
          },
          {
            id: plane3.id,
            attributes: {
              description: plane3.description,
              hashtags: plane3.hashtags,
            },
          },
        ],
      });
      expect(mockedUpdatePlanes).toHaveBeenCalledTimes(1);
      expect(mockedRemoveSpottedPlane).toHaveBeenCalledWith(plane3.id);
      expect(mockedRemoveSpottedPlane).toHaveBeenCalledTimes(1);
    });
  });

  describe('when got error', () => {
    test('alerts error and deletes updates planes locally', async () => {
      // Arrange
      const payload = [plane2];

      const mockedUpdatePlanes = jest.fn(() => {
        throw new Error('Upsss');
      });
      (useUpdateSpottedPlanes as unknown as jest.Mock).mockImplementationOnce(
        jest.fn(() => ({
          update: mockedUpdatePlanes,
        }))
      );

      const {
        result: { current },
      } = renderHook(() => useApplySpottedPlanes());
      const { update } = current;
      // Act
      await update(payload as unknown as SpottedPlaneProviderData[]);
      // Assert
      expect(mockedCreateErrorAlert).toHaveBeenCalledWith('Upsss');
      expect(mockedCreateErrorAlert).toHaveBeenCalledTimes(1);
      expect(mockedUpdatePlanes).toHaveBeenCalledWith({
        data: [
          {
            id: plane2.id,
            attributes: {
              description: plane2.description,
              hashtags: plane2.hashtags,
            },
          },
        ],
      });
      expect(mockedUpdatePlanes).toHaveBeenCalledTimes(1);
      expect(mockedRemoveSpottedPlane).not.toHaveBeenCalled();
    });
  });
});
