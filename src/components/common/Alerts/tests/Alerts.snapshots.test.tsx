import renderWithTheme from '@/tests/helpers';

import { Alert } from '@/types/alerts';

import Alerts from '@/components/common/Alerts';

describe('Alerts snapshot', () => {
  const mockedAlerts: Alert[] = [
    { id: 1, text: 'Error', severity: 'error' },
    { id: 2, text: 'Info', severity: 'info' },
    { id: 3, text: 'Warning', severity: 'warning' },
    { id: 4, text: 'Success', severity: 'success' },
  ];
  const mockedRemoveAlert = jest.fn();

  test('renders successfully', () => {
    // Arrange
    // Act
    const { baseElement } = renderWithTheme(
      <Alerts alerts={mockedAlerts} removeAlert={mockedRemoveAlert} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
});
