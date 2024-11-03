import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import { mockedPhotosList } from '@/spotting/types/mocks';

import { PhotoActionType } from '@/spotting/types';

import PhotoInfoActions from '../PhotoInfoActions';

jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');

describe('PhotoInfoActions', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        photosList: [],
        handlingText: 'handling-text',
        dispatch,
      }))
    );
    // Act
    const { baseElement } = renderWithTheme(<PhotoInfoActions />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when photosList passed', () => {
    test('renders successfully', () => {
      // Arange
      (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          photosList: mockedPhotosList,
          handlingText: 'handling-text',
          dispatch,
        }))
      );
      // Act
      const { baseElement } = renderWithTheme(<PhotoInfoActions />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when clicks Select all', () => {
      test('calls dispatch', async () => {
        // Arange
        (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
          jest.fn(() => ({
            photosList: mockedPhotosList,
            handlingText: 'handling-text',
            dispatch,
          }))
        );
        const { getByText } = renderWithTheme(<PhotoInfoActions />);
        // Act
        await userEvent.click(getByText('Select all'));
        // Assert
        expect(dispatch).toBeCalledWith({ type: PhotoActionType.SELECT_ALL });
      });
    });

    describe('when clicks Clear selections', () => {
      test('calls dispatch', async () => {
        // Arange
        (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
          jest.fn(() => ({
            photosList: mockedPhotosList,
            handlingText: 'handling-text',
            dispatch,
          }))
        );
        const { getByText } = renderWithTheme(<PhotoInfoActions />);
        // Act
        await userEvent.click(getByText('Clear selections'));
        // Assert
        expect(dispatch).toBeCalledWith({ type: PhotoActionType.UNSELECT_ALL });
      });
    });

    describe('when clicks Delete all', () => {
      test('calls dispatch', async () => {
        // Arange
        (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
          jest.fn(() => ({
            photosList: mockedPhotosList,
            handlingText: 'handling-text',
            dispatch,
          }))
        );
        const { getByText } = renderWithTheme(<PhotoInfoActions />);
        // Act
        await userEvent.click(getByText('Delete all'));
        // Assert
        expect(dispatch).toBeCalledWith({
          type: PhotoActionType.CLEAR_FILES,
        });
      });
    });

    describe('when clicks Create folder', () => {
      test('calls dispatch', async () => {
        // Arange
        (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
          jest.fn(() => ({
            photosList: mockedPhotosList,
            handlingText: 'handling-text',
            dispatch,
          }))
        );
        const { getByText } = renderWithTheme(<PhotoInfoActions />);
        // Act
        await userEvent.click(getByText('Create folder'));
        // Assert
        expect(dispatch).toBeCalledWith({
          type: PhotoActionType.CREATE_FOLDER,
        });
      });
    });
  });
});
