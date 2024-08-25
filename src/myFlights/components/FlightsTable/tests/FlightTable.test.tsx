import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { showWhen } from '@/common/utils/dayjs';

import useFlightsContext from '@/myFlights/contexts/hooks/useFlightsContext';
import useFilter from '@/common/hooks/useFilter';
import useTableOrder from '@/common/hooks/useTableOrder';
import useTablePagination from '@/common/hooks/useTablePagination';
import useTableCollapse from '@/common/hooks/useTableCollapse';
import useThemeBreakpoints from '@/common/hooks/useThemeBreakpoints';

import FilterInput from '@/common/components/FilterInput';
import FlightCard from '@/myFlights/components/FlightCard';

import MockedFilterInput from '@/common/components/FilterInput/mocks';
import MockedFlightCard from '@/myFlights/components/FlightCard/mocks';

import {
  mockedMyFlight1,
  mockedMyFlight2,
  mockedMyFlight3,
  mockedMyFlightsList,
} from '@/myFlights/types/mocks';

import FlightsTable from '../FlightsTable';
import userEvent from '@testing-library/user-event';

jest.mock('@/common/utils/dayjs');
jest.mock('@/myFlights/contexts/hooks/useFlightsContext');
jest.mock('@/common/hooks/useFilter');
jest.mock('@/common/hooks/useTableOrder');
jest.mock('@/common/hooks/useTablePagination');
jest.mock('@/common/hooks/useTableCollapse');
jest.mock('@/common/hooks/useThemeBreakpoints');
jest.mock('@/common/components/FilterInput');
jest.mock('@/myFlights/components/FlightCard');

describe('FlightTable', () => {
  const mockedShowWhen = jest.fn((arg) => arg);

  const mockedUseFlightsContext = jest.fn(() => ({
    flightsList: mockedMyFlightsList,
  }));

  const mockedSetFilterQuery = jest.fn();
  const mockedUseFilterResult = {
    filterQuery: '',
    setFilterQuery: mockedSetFilterQuery,
    visibleItems: mockedMyFlightsList,
  };
  const mockedUseFilter = jest.fn(() => mockedUseFilterResult);

  const mockedReverse = jest.fn();
  const mockedUseTableOrderResult = {
    orderedList: mockedMyFlightsList,
    isReversedOrder: true,
    reverse: mockedReverse,
  };
  const mockedUseTableOrder = jest.fn(() => mockedUseTableOrderResult);

  const mockedOnPageChange = jest.fn();
  const mockedOnRowsPerPageChange = jest.fn();
  const mockedPaginationProps = {
    rowsPerPageOptions: [10, 20],
    component: 'div',
    count: 100,
    rowsPerPage: 10,
    page: 0,
    onPageChange: mockedOnPageChange,
    onRowsPerPageChange: mockedOnRowsPerPageChange,
  };
  const mockedUseTablePaginationResult = {
    paginationProps: mockedPaginationProps,
    rows: mockedMyFlightsList,
  };
  const mockedUseTablePagination = jest.fn(
    () => mockedUseTablePaginationResult
  );

  const mockedToggleOpenRowId = jest.fn();
  const mockedUseTableCollapse = jest.fn(() => [null, mockedToggleOpenRowId]);

  const mockedBreakpoints = {
    down: { sm: false, md: false },
  };
  const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);

  beforeEach(() => {
    (showWhen as unknown as jest.Mock).mockImplementation(mockedShowWhen);
    (useFlightsContext as unknown as jest.Mock).mockImplementation(
      mockedUseFlightsContext
    );
    (useFilter as unknown as jest.Mock).mockImplementation(mockedUseFilter);
    (useTableOrder as unknown as jest.Mock).mockImplementation(
      mockedUseTableOrder
    );
    (useTablePagination as unknown as jest.Mock).mockImplementation(
      mockedUseTablePagination
    );
    (useTableCollapse as unknown as jest.Mock).mockImplementation(
      mockedUseTableCollapse
    );
    (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
      mockedUseThemeBreakpoints
    );
    (FilterInput as unknown as jest.Mock).mockImplementation(MockedFilterInput);
    (FlightCard as unknown as jest.Mock).mockImplementation(MockedFlightCard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<FlightsTable />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(useFlightsContext).toBeCalledWith();
    expect(useFilter).toBeCalledWith(mockedMyFlightsList, [
      'airline',
      'manufacturer',
      'model',
      'registration',
      'origin',
      'destination',
      'originName',
      'destinationName',
      'airplaneName',
    ]);
    expect(useTableOrder).toBeCalledWith(mockedMyFlightsList, true);
    expect(useTablePagination).toBeCalledWith(mockedMyFlightsList, [
      10,
      25,
      50,
      100,
      mockedMyFlightsList.length,
    ]);
    expect(useTableCollapse).toBeCalledWith();
    expect(useThemeBreakpoints).toBeCalledWith();
    expect(FilterInput).toBeCalledWith(
      { value: '', setValue: expect.any(Function), fullWidth: true },
      {}
    );
    expect(FlightCard).toBeCalledTimes(3);
    expect(FlightCard).nthCalledWith(1, { data: mockedMyFlight1 }, {});
    expect(FlightCard).nthCalledWith(2, { data: mockedMyFlight2 }, {});
    expect(FlightCard).nthCalledWith(3, { data: mockedMyFlight3 }, {});
  });

  describe('when table hook results changed', () => {
    const mockedFilterQuery = 'filter-query';
    const mockedUseFilter = jest.fn(() => ({
      ...mockedUseFilterResult,
      filterQuery: mockedFilterQuery,
    }));

    const mockedUseTableOrder = jest.fn(() => ({
      ...mockedUseTableOrderResult,
      isReversedOrder: false,
    }));

    const mockedUseTablePagination = jest.fn(() => ({
      ...mockedUseTablePaginationResult,
      paginationProps: {
        ...mockedPaginationProps,
        rowsPerPage: 20,
        page: 1,
      },
    }));

    const mockedUseTableCollapse = jest.fn(() => [
      mockedMyFlight2.id,
      mockedToggleOpenRowId,
    ]);

    beforeEach(() => {
      (useFilter as unknown as jest.Mock).mockImplementation(mockedUseFilter);
      (useTableOrder as unknown as jest.Mock).mockImplementation(
        mockedUseTableOrder
      );
      (useTablePagination as unknown as jest.Mock).mockImplementation(
        mockedUseTablePagination
      );
      (useTableCollapse as unknown as jest.Mock).mockImplementation(
        mockedUseTableCollapse
      );
    });

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<FlightsTable />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(useFlightsContext).toBeCalledWith();
      expect(useFilter).toBeCalledWith(mockedMyFlightsList, [
        'airline',
        'manufacturer',
        'model',
        'registration',
        'origin',
        'destination',
        'originName',
        'destinationName',
        'airplaneName',
      ]);
      expect(useTableOrder).toBeCalledWith(mockedMyFlightsList, true);
      expect(useTablePagination).toBeCalledWith(mockedMyFlightsList, [
        10,
        25,
        50,
        100,
        mockedMyFlightsList.length,
      ]);
      expect(useTableCollapse).toBeCalledWith();
      expect(useThemeBreakpoints).toBeCalledWith();
      expect(FilterInput).toBeCalledWith(
        {
          value: mockedFilterQuery,
          setValue: expect.any(Function),
          fullWidth: true,
        },
        {}
      );
      expect(FlightCard).toBeCalledTimes(3);
      expect(FlightCard).nthCalledWith(1, { data: mockedMyFlight1 }, {});
      expect(FlightCard).nthCalledWith(2, { data: mockedMyFlight2 }, {});
      expect(FlightCard).nthCalledWith(3, { data: mockedMyFlight3 }, {});
    });
  });

  describe('when screen is lower than md breakpoint', () => {
    test('renders successfully', () => {
      // Arange
      const mockedBreakpoints = {
        down: { sm: false, md: true },
      };
      const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);
      (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
        mockedUseThemeBreakpoints
      );
      // Act
      const { baseElement } = renderWithTheme(<FlightsTable />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('and lower than sm breakpoint', () => {
      test('renders successfully', () => {
        // Arange
        const mockedBreakpoints = {
          down: { sm: true, md: true },
        };
        const mockedUseThemeBreakpoints = jest.fn(() => mockedBreakpoints);
        (useThemeBreakpoints as unknown as jest.Mock).mockImplementation(
          mockedUseThemeBreakpoints
        );
        // Act
        const { baseElement } = renderWithTheme(<FlightsTable />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });

  describe('When clicks to reverse', () => {
    test('renders successfully', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(<FlightsTable />);
      // Act
      await userEvent.click(getByLabelText('Reverse'));
      // Assert
      expect(mockedReverse).toHaveBeenCalled();
    });
  });

  describe('When clicks to collapse', () => {
    test('renders successfully', async () => {
      // Arange
      const { getByText } = renderWithTheme(<FlightsTable />);
      // Act
      await userEvent.click(getByText(mockedMyFlight3.attributes.date!));
      // Assert
      expect(mockedToggleOpenRowId).toHaveBeenCalledWith(mockedMyFlight3.id);
    });
  });
});
