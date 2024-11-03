import { renderHook, waitFor } from '@testing-library/react';

import { PhotoActionType } from '@/spotting/types';

import useAlerts from '@/common/hooks/alerts';
import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import zipPhotoFolders from '../../utils/zipPhotoFolders';
import createPhotoInfo from '../../utils/createPhotoInfo';

import { mockedPhotoFolder1, mockedPhotoFolder2 } from '@/spotting/types/mocks';

import usePhotoInfoSaver from '../usePhotoInfoSaver';

jest.mock('@/common/hooks/alerts');
jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');
jest.mock('../../utils/zipPhotoFolders');
jest.mock('../../utils/createPhotoInfo');

describe('usePhotoInfoSaver', () => {
  const createSuccessAlert = jest.fn();
  const createErrorAlert = jest.fn();
  const createWarnAlert = jest.fn();
  const files = 'files';
  const newMatchers = 'newMatchers';
  const updateMatchers = jest.fn();
  const dispatch = jest.fn();
  const foldersList = [
    mockedPhotoFolder1,
    { ...mockedPhotoFolder2, attributes: { title: 'TITLE' } },
  ];

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        createSuccessAlert,
        createErrorAlert,
        createWarnAlert,
      }))
    );
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        foldersList,
        files,
        newMatchers,
        updateMatchers,
        dispatch,
      }))
    );
    (zipPhotoFolders as unknown as jest.Mock).mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('creates success alert and cleans up state', async () => {
    // Arange
    (createPhotoInfo as unknown as jest.Mock).mockImplementationOnce(
      jest.fn(() => [{ ok: true, value: { data: { id: 1 } } }])
    );
    const { result } = renderHook(() => usePhotoInfoSaver());
    // Act
    result.current.onSave();
    // Assert
    await waitFor(() => {
      expect(zipPhotoFolders).toBeCalledWith(foldersList, files);
      expect(createPhotoInfo).toBeCalledWith(
        foldersList,
        expect.any(Function),
        expect.any(Function)
      );
      expect(dispatch).toBeCalledWith({ type: PhotoActionType.CLEAR_FILES });
      expect(updateMatchers).toBeCalledWith(newMatchers);
      expect(result.current.loading).toBe(false);
      expect(createSuccessAlert).toHaveBeenCalledWith(
        'All folders saved successfully'
      );
      expect(createErrorAlert).not.toHaveBeenCalled();
      expect(createWarnAlert).not.toHaveBeenCalled();
    });
  });

  describe('when no folders saved', () => {
    test('creates error alert', async () => {
      // Arange
      (createPhotoInfo as unknown as jest.Mock).mockImplementationOnce(
        jest.fn(() => [
          { ok: false, value: { error: { message: 'Bad luck I guess..' } } },
          {
            ok: true,
            value: { error: { message: 'Ah shit, here we go again' } },
          },
        ])
      );
      const { result } = renderHook(() => usePhotoInfoSaver());
      // Act
      result.current.onSave();
      // Assert
      await waitFor(() => {
        expect(zipPhotoFolders).toBeCalledWith(foldersList, files);
        expect(createPhotoInfo).toBeCalledWith(
          foldersList,
          expect.any(Function),
          expect.any(Function)
        );
        expect(dispatch).not.toHaveBeenCalled();
        expect(updateMatchers).toBeCalledWith(newMatchers);
        expect(result.current.loading).toBe(false);
        expect(createSuccessAlert).not.toHaveBeenCalled();
        expect(createErrorAlert).nthCalledWith(1, 'No folders saved');
        expect(createErrorAlert).nthCalledWith(
          2,
          'Folder 1 not saved: Bad luck I guess..'
        );
        expect(createErrorAlert).nthCalledWith(
          3,
          'TITLE not saved: Ah shit, here we go again'
        );
        expect(createWarnAlert).not.toHaveBeenCalled();
      });
    });
  });

  describe('when some folders not saved', () => {
    test('creates error alert', async () => {
      // Arange
      (createPhotoInfo as unknown as jest.Mock).mockImplementationOnce(
        jest.fn(() => [
          { ok: false, value: { error: { message: 'Bad luck I guess..' } } },
          {
            ok: true,
            value: { error: { message: 'Ah shit, here we go again' } },
          },
          { ok: true, value: { data: { id: 1 } } },
        ])
      );
      const { result } = renderHook(() => usePhotoInfoSaver());
      // Act
      result.current.onSave();
      // Assert
      await waitFor(() => {
        expect(zipPhotoFolders).toBeCalledWith(foldersList, files);
        expect(createPhotoInfo).toBeCalledWith(
          foldersList,
          expect.any(Function),
          expect.any(Function)
        );
        expect(dispatch).not.toHaveBeenCalled();
        expect(updateMatchers).toBeCalledWith(newMatchers);
        expect(result.current.loading).toBe(false);
        expect(createSuccessAlert).not.toHaveBeenCalled();
        expect(createErrorAlert).nthCalledWith(
          1,
          'Folder 1 not saved: Bad luck I guess..'
        );
        expect(createErrorAlert).nthCalledWith(
          2,
          'TITLE not saved: Ah shit, here we go again'
        );
        expect(createWarnAlert).toHaveBeenCalledWith(
          'Only 1 of 3 folders saved'
        );
      });
    });
  });
});
