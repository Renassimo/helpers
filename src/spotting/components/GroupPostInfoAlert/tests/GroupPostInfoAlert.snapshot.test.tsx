import renderWithTheme from '@/common/tests/helpers';

import GroupPostInfoAlert from '@/spotting/components/GroupPostInfoAlert';

describe('GroupPostInfoAlert snapshots', () => {
  test('renders successfully', () => {
    // Arrange
    const mockedOnOpenModal = jest.fn();
    const mockedClearSelectedIds = jest.fn();
    // Act
    const { container } = renderWithTheme(
      <GroupPostInfoAlert
        selectedCount={3}
        onOpenModal={mockedOnOpenModal}
        clearSelectedIds={mockedClearSelectedIds}
      />
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});
