import renderWithTheme from '@/common/tests/helpers';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { PhotoActionType } from '@/spotting/types';

import BaseAirportForm from '@/avia/components/BaseAirportForm';

import useAlerts from '@/common/hooks/alerts';
import useAirports from '@/avia/hooks/useAirports';
import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import MockedBaseAirportForm from '@/avia/components/BaseAirportForm/mocks';

import PhotoPlaceForm from '../PhotoPlaceForm';

jest.mock('@/avia/components/BaseAirportForm');
jest.mock('@/common/hooks/alerts');
jest.mock('@/avia/hooks/useAirports');
jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');

describe('PhotoPlaceForm', () => {
  const createInfoAlert = jest.fn();
  const retreiveAirports = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    (BaseAirportForm as jest.Mock).mockImplementation(MockedBaseAirportForm);
    (useAlerts as jest.Mock).mockReturnValue({ createInfoAlert });
    (useAirports as jest.Mock).mockReturnValue({
      chosenAirport: { attributes: { airportCode: 'test' } },
      retreiveAirports,
      loading: false,
    });
    (usePhotoInfoContext as jest.Mock).mockReturnValue({
      dispatch,
      photosList: [{ location: { lat: 10, lon: 20 } }],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoPlaceForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(dispatch).toHaveBeenCalledWith({
      type: PhotoActionType.UPDATE_PLACE,
      payload: 'test',
    });
  });

  describe('When clicks "Find Location from Photos"', () => {
    test('calls findLocationFromPhotos', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(<PhotoPlaceForm />);
      // Act
      await userEvent.click(getByLabelText('Find Location from Photos'));
      // Assert
      await waitFor(() => {
        expect(retreiveAirports).toHaveBeenCalledWith({ lat: '10', lon: '20' });
      });
    });

    describe('and when no location passed', () => {
      test('calls findLocationFromPhotos', async () => {
        // Arange
        (usePhotoInfoContext as jest.Mock).mockReturnValue({
          dispatch,
          photosList: [{ location: null }],
        });
        const { getByLabelText } = renderWithTheme(<PhotoPlaceForm />);
        // Act
        await userEvent.click(getByLabelText('Find Location from Photos'));
        // Assert
        await waitFor(() => {
          expect(createInfoAlert).toHaveBeenCalledWith(
            "Location didn't find in photos"
          );
        });
      });
    });
  });
});
