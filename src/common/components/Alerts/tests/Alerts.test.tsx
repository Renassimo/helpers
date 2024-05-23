import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import { Alert } from '@/common/types/alerts';

import Alerts from '@/common/components/Alerts';

describe('Alerts snapshot', () => {
  const mockedAlerts: Alert[] = [
    { id: 1, text: 'Error', severity: 'error' },
    { id: 2, text: 'Info', severity: 'info' },
    { id: 3, text: 'Warning', severity: 'warning' },
    { id: 4, text: 'Success', severity: 'success' },
  ];
  const mockedRemoveAlert = jest.fn();

  test('renders successfully', async () => {
    // Arrange
    const { getAllByRole } = renderWithTheme(
      <Alerts alerts={mockedAlerts} removeAlert={mockedRemoveAlert} />
    );
    // Act
    await userEvent.click(getAllByRole('button')[2]);
    // Assert
    expect(mockedRemoveAlert).toHaveBeenCalledWith(mockedAlerts[2].id);
  });
});
