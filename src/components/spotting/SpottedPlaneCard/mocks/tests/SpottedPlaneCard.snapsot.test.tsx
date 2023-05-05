import renderWithTheme from '@/tests/helpers';

import SpottedPlaneCard from '@/components/spotting/SpottedPlaneCard';
import { mockedSpottedPlaneProviderDataTruthy } from '@/types/spotting/mocks/mockedSpottedPlaneProviderData';

import SelectableCard from '@/components/spotting/SelectableCard';
import SpottedPlaneForm from '@/components/spotting/SpottedPlaneForm';

import MockedSelectableCard from '@/components/spotting/SelectableCard/mocks';
import MockedSpottedPlaneForm from '@/components/spotting/SpottedPlaneForm/mocks';

jest.mock('@/components/spotting/SelectableCard');
jest.mock('@/components/spotting/SpottedPlaneForm');

describe('SpottedPlaneCard snapshots', () => {
  test('renders successfully', () => {
    // Arrange
    (SelectableCard as unknown as jest.Mock).mockImplementation(
      MockedSelectableCard
    );
    (SpottedPlaneForm as unknown as jest.Mock).mockImplementation(
      MockedSpottedPlaneForm
    );
    // Act
    const { container } = renderWithTheme(
      <SpottedPlaneCard data={mockedSpottedPlaneProviderDataTruthy} />
    );
    // Assert
    expect(container).toMatchSnapshot();
    expect(MockedSpottedPlaneForm).toHaveBeenCalledWith(
      {
        data: mockedSpottedPlaneProviderDataTruthy,
      },
      {}
    );
  });
});
