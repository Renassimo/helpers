import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { PageInfo } from '@/auth/types';

import PagesList from '../PagesList';

describe('PagesList snapshot', () => {
  test('renders successfully', () => {
    // Arange
    const mockedPages: PageInfo[] = [{ title: 'Page 1', path: '/path1' }];
    // Act
    const { baseElement } = renderWithTheme(<PagesList pages={mockedPages} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
