import renderWithTheme from '@/tests/helpers';
import userEvent from '@testing-library/user-event';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import NewFirstFlightForm from '@/components/spotting/NewFirstFlightForm';

jest.mock('@/hooks/spotting/useSpottedPlanes');

describe('NewFirstFlightForm', () => {
  const mockedUpdateNewFirstFlight = jest.fn();

  beforeEach(() => {
    (useSpottedPlanes as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        updateNewFirstFlight: mockedUpdateNewFirstFlight,
      }))
    );
  });

  test('updates date', async () => {
    // Arrange
    const mockedId = 'id-mocked';
    const mockedDate = '25 May 2009';
    const expectedDate = '2009-05-25';
    const { getByPlaceholderText } = renderWithTheme(
      <NewFirstFlightForm id={mockedId} />
    );
    await userEvent.click(getByPlaceholderText('First flight (1 Sep 1999)'));
    // Act
    await userEvent.paste(mockedDate);
    // Assert
    expect(mockedUpdateNewFirstFlight).toHaveBeenCalledWith(
      mockedId,
      expectedDate
    );
  });
});
