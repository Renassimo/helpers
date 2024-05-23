import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import GroupPostInfoAlert from '@/spotting/components/GroupPostInfoAlert';

describe('GroupPostInfoAlert', () => {
  const mockedOnOpenModal = jest.fn();
  const mockedClearSelectedIds = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when clicked to create', () => {
    test('calls clearSelectedIds', async () => {
      // Arrange
      const { getByText } = renderWithTheme(
        <GroupPostInfoAlert
          selectedCount={3}
          onOpenModal={mockedOnOpenModal}
          clearSelectedIds={mockedClearSelectedIds}
        />
      );
      // Act
      await userEvent.click(getByText('Cancel'));
      // Assert
      expect(mockedClearSelectedIds).toHaveBeenCalled();
      expect(mockedOnOpenModal).not.toHaveBeenCalled();
    });
  });

  describe('when clicked to cancel', () => {
    test('calls clearSelectedIds', async () => {
      // Arrange
      const { getByText } = renderWithTheme(
        <GroupPostInfoAlert
          selectedCount={3}
          onOpenModal={mockedOnOpenModal}
          clearSelectedIds={mockedClearSelectedIds}
        />
      );
      // Act
      await userEvent.click(getByText('Create'));
      // Assert
      expect(mockedClearSelectedIds).not.toHaveBeenCalled();
      expect(mockedOnOpenModal).toHaveBeenCalled();
    });
  });
});
