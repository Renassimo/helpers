import userEvent from '@testing-library/user-event';

import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { PageInfo } from '@/auth/types';

import PagesList from '../PagesList';

describe('PagesList', () => {
  const mockedHandler = jest.fn();
  const mockedPages: PageInfo[] = [
    { title: 'Page 1', path: '/path1' },
    { title: 'Page 2', path: '/path2', onClick: mockedHandler },
  ];

  describe('when clicks to link with handler', () => {
    test('calls handler', async () => {
      // Arange
      const { getByText } = renderWithTheme(<PagesList pages={mockedPages} />);
      // Act
      await userEvent.click(getByText('Page 2'));
      // Assert
      expect(mockedHandler).toHaveBeenCalled();
    });
  });
});
