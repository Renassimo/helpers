import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import SpottedPlaneForm from '@/components/spotting/SpottedPlaneForm';

import { mockedSpottedPlaneProviderDataTruthy } from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

jest.mock('@/hooks/spotting/useSpottedPlanes');

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
