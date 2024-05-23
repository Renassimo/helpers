import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import GroupPlanesForm from '@/spotting/components/GroupPlanesForm';

jest.mock('@/hooks/spotting/useSpottedPlanes');

describe('GroupPlanesForm', () => {
  const mockedGroupDescription = 'Group description';
  const mockedGroupHashtags = '#GroupHashtags';
  const mockedGroupName = 'Group name';
  const mockedSetGroupDescription = jest.fn();
  const mockedSetGroupHashtags = jest.fn();
  const mockedSetGroupName = jest.fn();

  beforeEach(() => {
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(() => ({
      groupDescription: mockedGroupDescription,
      groupHashtags: mockedGroupHashtags,
      groupName: mockedGroupName,
      setGroupDescription: mockedSetGroupDescription,
      setGroupHashtags: mockedSetGroupHashtags,
      setGroupName: mockedSetGroupName,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when description changed', () => {
    test('calls setGroupDescription', async () => {
      // Arrange
      const typingText = '!';
      const { getByPlaceholderText } = renderWithTheme(<GroupPlanesForm />);
      // Act
      await userEvent.type(getByPlaceholderText('Description'), typingText);
      // Assert
      expect(mockedSetGroupDescription).toHaveBeenCalledWith(
        `${mockedGroupDescription}${typingText}`
      );
      expect(mockedSetGroupHashtags).not.toHaveBeenCalled();
      expect(mockedSetGroupName).not.toHaveBeenCalled();
    });
  });

  describe('when hashtags changed', () => {
    test('calls setGroupHashtags', async () => {
      // Arrange
      const typingText = '#';
      const { getByPlaceholderText } = renderWithTheme(<GroupPlanesForm />);
      // Act
      await userEvent.type(getByPlaceholderText('Hashtags'), typingText);
      // Assert
      expect(mockedSetGroupDescription).not.toHaveBeenCalled();
      expect(mockedSetGroupHashtags).toHaveBeenCalledWith(
        `${mockedGroupHashtags}${typingText}`
      );
      expect(mockedSetGroupName).not.toHaveBeenCalled();
    });
  });

  describe('when group name changed', () => {
    test('calls setGroupName', async () => {
      // Arrange
      const typingText = '!';
      const { getByPlaceholderText } = renderWithTheme(<GroupPlanesForm />);
      // Act
      await userEvent.type(getByPlaceholderText('Group name'), typingText);
      // Assert
      expect(mockedSetGroupDescription).not.toHaveBeenCalled();
      expect(mockedSetGroupHashtags).not.toHaveBeenCalled();
      expect(mockedSetGroupName).toHaveBeenCalledWith(
        `${mockedGroupName}${typingText}`
      );
    });
  });
});
