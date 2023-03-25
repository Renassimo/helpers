import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import useAlerts from '@/hooks/alerts';

import AlertsProvider from '@/providers/alerts';

const TestingComponent = () => {
  const {
    createErrorAlert,
    createWarnAlert,
    createSuccessAlert,
    createInfoAlert,
  } = useAlerts();

  return (
    <>
      <button type="button" onClick={() => createErrorAlert('New error')}>
        Error
      </button>
      <button type="button" onClick={() => createWarnAlert('New warning')}>
        Warn
      </button>
      <button type="button" onClick={() => createSuccessAlert('New success')}>
        Success
      </button>
      <button type="button" onClick={() => createInfoAlert('New info')}>
        Info
      </button>
    </>
  );
};

describe('AlertsProvider', () => {
  test('Creates alerts and shows it', async () => {
    // Arrange
    const { getByText } = renderWithTheme(
      <AlertsProvider>
        <TestingComponent />
      </AlertsProvider>
    );
    // Act
    await userEvent.click(getByText('Error'));
    await userEvent.click(getByText('Warn'));
    await userEvent.click(getByText('Success'));
    await userEvent.click(getByText('Info'));
    // Assert
    expect(getByText('New error')).toBeTruthy();
    expect(getByText('New warning')).toBeTruthy();
    expect(getByText('New success')).toBeTruthy();
    expect(getByText('New info')).toBeTruthy();
  });
});
