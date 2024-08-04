import renderWithTheme from '@/common/tests/helpers';

import Breadcrumbs from '../Breadcrumbs';

import { mockedBreadCrumbItem3 } from '@/common/types/props/mocks';
import userEvent from '@testing-library/user-event';

describe('Breadcrumbs snapshot', () => {
  const mockedAction = jest.fn();
  const mockedBreadCrumbsItems = [
    { ...mockedBreadCrumbItem3, action: mockedAction },
  ];

  test('calls action', async () => {
    // Arange
    const { getByText } = renderWithTheme(
      <Breadcrumbs data={mockedBreadCrumbsItems} />
    );
    // Act
    await userEvent.click(getByText(mockedBreadCrumbItem3.title));
    // Assert
    expect(mockedAction).toHaveBeenCalledWith();
  });
});
