import renderWithTheme from '@/tests/helpers';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import GroupPlanesForm from '@/components/spotting/GroupPlanesForm';

jest.mock('@/hooks/spotting/useSpottedPlanes');

describe('GroupPlanesForm', () => {
  const mockedGroupDescription = 'Group description #descriptionHashtag';
  let mockedGroupHashtags = '';
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

  test('should rendered successfully', () => {
    // Arrange
    mockedGroupHashtags = '#GroupHashtags';
    // Act
    const { container } = renderWithTheme(<GroupPlanesForm />);
    // Assert
    expect(container).toMatchSnapshot();
  });

  describe('When exceeded hashtags', () => {
    test('should rendered successfully', () => {
      // Arrange
      mockedGroupHashtags = `#GroupHashtags ${'#hashtag'.repeat(29)}`;
      // Act
      const { container } = renderWithTheme(<GroupPlanesForm />);
      // Assert
      expect(container).toMatchSnapshot();
    });
  });
});
