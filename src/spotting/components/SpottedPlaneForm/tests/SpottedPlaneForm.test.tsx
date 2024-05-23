import renderWithTheme from '@/common/tests/helpers';
import userEvent from '@testing-library/user-event';

import useSpottedPlanes from '@/spotting/hooks/useSpottedPlanes';

import SpottedPlaneForm from '@/spotting/components/SpottedPlaneForm';

import { mockedSpottedPlaneProviderDataTruthy } from '@/spotting/types/mocks/mockedSpottedPlaneProviderData';

jest.mock('@/spotting/hooks/useSpottedPlanes');

describe('SpottedPlaneForm', () => {
  const mockedUpdateDescription = jest.fn();
  const mockedUpdateHashtags = jest.fn();

  beforeEach(() => {
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        updateDescription: mockedUpdateDescription,
        updateHashtags: mockedUpdateHashtags,
      }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when typed on description', () => {
    test('updates description', async () => {
      // Arrange
      const { id, description } = mockedSpottedPlaneProviderDataTruthy;
      const text = '!';
      const { getByText } = renderWithTheme(
        <SpottedPlaneForm data={mockedSpottedPlaneProviderDataTruthy} />
      );
      // Act
      await userEvent.type(getByText(description), text);
      // Assert
      expect(mockedUpdateDescription).toHaveBeenCalledWith(
        id,
        `${description}${text}`
      );
      expect(mockedUpdateHashtags).not.toHaveBeenCalled();
    });
  });

  describe('when typed on hashtags', () => {
    test('updates description', async () => {
      // Arrange
      const { id, hashtags } = mockedSpottedPlaneProviderDataTruthy;
      const text = '#';
      const { getByText } = renderWithTheme(
        <SpottedPlaneForm data={mockedSpottedPlaneProviderDataTruthy} />
      );
      // Act
      await userEvent.type(getByText(hashtags), text);
      // Assert
      expect(mockedUpdateDescription).not.toHaveBeenCalled();
      expect(mockedUpdateHashtags).toHaveBeenCalledWith(
        id,
        `${hashtags}${text}`
      );
    });
  });
});
